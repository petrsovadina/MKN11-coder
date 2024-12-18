from typing import List, Dict
import json
from openai import AsyncOpenAI
import os
from dotenv import load_dotenv

load_dotenv()

class OpenAIClient:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = os.getenv("MODEL_NAME", "gpt-4-1106-preview")
        self.max_tokens = int(os.getenv("MAX_TOKENS", "2000"))
        self.temperature = float(os.getenv("TEMPERATURE", "0.3"))

    async def extract_diagnoses(self, text: str) -> List[Dict[str, str]]:
        """
        Extrahuje diagnózy z textu pomocí OpenAI API.
        
        Args:
            text: Vstupní text lékařské zprávy
            
        Returns:
            List[Dict]: Seznam extrahovaných diagnóz
        """
        try:
            system_prompt = """Jsi expertní systém pro analýzu českých lékařských zpráv a extrakci diagnóz.
            
            Tvým úkolem je:
            1. Analyzovat text lékařské zprávy v češtině
            2. Identifikovat všechny diagnózy, zdravotní stavy a příznaky
            3. Pro každou diagnózu určit nejpravděpodobnější MKN-11 kód
            4. Extrahovat relevantní kontext a popis každé diagnózy
            
            Pravidla pro extrakci:
            - Zaměř se na hlavní diagnózy a významné komorbidity
            - Extrahuj i související příznaky a projevy
            - U chronických onemocnění uveď i stadium/závažnost
            - Pokud je diagnóza nejistá, označ ji jako "předběžná"
            
            Odpovídej pouze v JSON formátu s následující strukturou:
            {
                "diagnoses": [
                    {
                        "text": "přesný text diagnózy z dokumentu",
                        "description": "kontext a popis diagnózy",
                        "suggested_code": "navrhovaný MKN-11 kód",
                        "confidence": "high/medium/low",
                        "is_preliminary": true/false
                    }
                ]
            }"""

            completion = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": text}
                ],
                temperature=self.temperature,
                max_tokens=self.max_tokens,
                response_format={"type": "json_object"}
            )

            result = json.loads(completion.choices[0].message.content)
            return result["diagnoses"]

        except Exception as e:
            print(f"Chyba při komunikaci s OpenAI API: {str(e)}")
            raise
