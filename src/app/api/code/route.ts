import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import stringSimilarity from "string-similarity";
import terminologyData from "@/data/mkn11_terminology.json";
import { TerminologyItem, DiagnosisMatch } from "@/types/terminology";

// Typujeme data z JSON souboru
const rawTerminologyData = terminologyData as any[];

const typedTerminologyData: TerminologyItem[] = rawTerminologyData
  .filter(item => // Filter for items that can be mapped
    item &&
    typeof item.ID === 'string' && item.ID.trim() !== '' &&         // ID will be used as code
    typeof item.LabelCS === 'string' && item.LabelCS.trim() !== ''  // LabelCS will be used as term
    // We might need to add a filter for item.PropertyTranslation later if we only want specific types of terms
  )
  .map(item => ({
    code: item.ID, // Map ID to code
    term: item.LabelCS, // Map LabelCS to term
    description: typeof item.LabelEN === 'string' ? item.LabelEN : undefined // Optionally map LabelEN to description
  }));

// Log the number of valid items found after filtering and mapping
console.log(`Found ${typedTerminologyData.length} valid terminology items after filtering and mapping.`);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function findMatchingCodes(query: string, minScore = 0.3) { // Sníženo minScore z 0.8 na 0.3 pro testování
  const matches: DiagnosisMatch[] = [];
  // Log first 5 items from typedTerminologyData to inspect its content
  if (typedTerminologyData && typedTerminologyData.length > 0) {
    console.log("First 5 items from typedTerminologyData:", JSON.stringify(typedTerminologyData.slice(0, 5), null, 2));
  } else {
    console.log("typedTerminologyData is empty or undefined.");
  }
  const terms = typedTerminologyData.map(item => (item && item.term && typeof item.term === 'string' ? item.term.toLowerCase() : ""));
  const queryLower = query.toLowerCase();

  for (let i = 0; i < terms.length; i++) {
    const score = stringSimilarity.compareTwoStrings(queryLower, terms[i]);
    if (score >= minScore) {
      matches.push({
        code: typedTerminologyData[i].code,
        term: typedTerminologyData[i].term,
        score: score * 100,
      });
    }
  }

  return matches.sort((a, b) => b.score - a.score);
}

function getDiagnosisByCode(code: string): TerminologyItem | undefined {
  return typedTerminologyData.find(item => item.code === code);
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `Jsi expert na analýzu lékařských diagnóz. Extrahuj všechny diagnózy z textu a vrať je ve formátu JSON. 
          Vždy odpovídej pouze validním JSONem s objektem, který má klíč "diagnoses" obsahující pole diagnóz.
          Příklad: {"diagnoses":[{"text":"název diagnózy","description":"popis","suggested_code":"kód","confidence":"high"}]}`
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const rawResponseContent = chatCompletion.choices[0].message.content;
    console.log("Raw OpenAI response:", rawResponseContent); // Log raw response

    const extractedDiagnoses = JSON.parse(rawResponseContent || '{"diagnoses":[]}');
    console.log("Parsed extractedDiagnoses:", JSON.stringify(extractedDiagnoses, null, 2)); // Log parsed diagnoses

    const validatedCodes = [];
    if (extractedDiagnoses && extractedDiagnoses.diagnoses && Array.isArray(extractedDiagnoses.diagnoses)) {
      for (const diagnosis of extractedDiagnoses.diagnoses) {
        console.log("Processing diagnosis object:", JSON.stringify(diagnosis, null, 2)); // Log each diagnosis object

        if (diagnosis && typeof diagnosis.text === 'string' && diagnosis.text.trim() !== "") {
          const mkn11Matches = findMatchingCodes(diagnosis.text);
          console.log(`Matches for "${diagnosis.text}":`, JSON.stringify(mkn11Matches, null, 2)); // Log matches

          if (mkn11Matches.length > 0) {
            const bestMatch = mkn11Matches[0];
            const diagnosisDetails = getDiagnosisByCode(bestMatch.code);

            validatedCodes.push({
              diagnosis: diagnosis.text,
              description: diagnosisDetails?.description || diagnosis.description || "",
              icd_code: diagnosis.suggested_code || bestMatch.code,
              confidence: bestMatch.score > 90 ? "high" : "low",
              is_preliminary: true,
              score: bestMatch.score,
            });
          } else {
            console.log(`No MKN-11 matches found for diagnosis text: "${diagnosis.text}"`);
          }
        } else {
          console.warn("Skipping diagnosis due to missing or invalid 'text' field:", JSON.stringify(diagnosis, null, 2));
        }
      }
    } else {
      console.warn("extractedDiagnoses.diagnoses is not a valid array or is missing.");
    }

    console.log("Final validatedCodes to be sent:", JSON.stringify(validatedCodes, null, 2)); // Log final codes
    return NextResponse.json({ codes: validatedCodes });
  } catch (error: any) {
    console.error("Error processing diagnosis in POST:", error); // More specific log
    return NextResponse.json(
      { error: "Chyba při zpracování diagnózy: " + (error.message || "Neznámá chyba") },
      { status: 500 }
    );
  }
}
