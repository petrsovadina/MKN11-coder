import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { FileText, Brain, CheckCircle, Lightbulb, Sparkles, Upload } from "lucide-react";

export function HowItWorks() {
  const data = [
    {
      title: "1. Vložení textu",
      content: (
        <div>
          <p className="text-lg lg:text-xl font-normal mb-8">
            Vložte text lékařské zprávy do textového pole. Systém je navržen pro zpracování
            českého textu z lékařských zpráv.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-lg bg-transparent border border-border flex items-start space-x-4">
              <Upload className="h-6 w-6 text-primary mt-1" />
              <div>
                <h4 className="font-medium text-lg mb-2">Textový vstup</h4>
                <p className="text-lg text-muted-foreground">
                  Zkopírujte a vložte text přímo z vašeho dokumentu do textového pole.
                </p>
              </div>
            </div>
            <div className="p-6 rounded-lg bg-transparent border border-border flex items-start space-x-4">
              <Brain className="h-6 w-6 text-primary mt-1" />
              <div>
                <h4 className="font-medium text-lg mb-2">Příprava textu</h4>
                <p className="text-lg text-muted-foreground">
                  Systém text připraví pro analýzu pomocí umělé inteligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2. Analýza AI",
      content: (
        <div>
          <p className="text-lg lg:text-xl font-normal mb-8">
            Umělá inteligence analyzuje vložený text a hledá v něm relevantní diagnózy
            podle standardu MKN-11.
          </p>
          <div className="p-6 rounded-lg bg-transparent border border-border mb-4">
            <h4 className="font-medium text-lg mb-4">Proces zpracování:</h4>
            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground text-lg">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                Analýza textu pomocí jazykového modelu
              </div>
              <div className="flex items-center text-muted-foreground text-lg">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                Identifikace potenciálních diagnóz
              </div>
              <div className="flex items-center text-muted-foreground text-lg">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                Vyhledání odpovídajících MKN-11 kódů
              </div>
              <div className="flex items-center text-muted-foreground text-lg">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                Kontrola konzistence výsledků
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "3. Výsledky",
      content: (
        <div>
          <p className="text-lg lg:text-xl font-normal mb-8">
            Systém zobrazí nalezené diagnózy a jejich odpovídající kódy MKN-11.
            Výsledky jsou přehledně zobrazeny pro okamžité použití.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-lg bg-transparent border border-border">
              <h4 className="font-medium text-lg mb-3">Přehledné zobrazení</h4>
              <p className="text-lg text-muted-foreground">
                Výsledky jsou zobrazeny v přehledné formě pro snadné čtení.
                Každý kód je doplněn o český popis z MKN-11.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-transparent border border-border">
              <h4 className="font-medium text-lg mb-3">Validace výsledků</h4>
              <p className="text-lg text-muted-foreground">
                Všechny navržené kódy jsou validovány proti aktuální verzi MKN-11
                pro zajištění správnosti.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
