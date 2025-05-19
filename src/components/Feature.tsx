import React from "react"
import { Section, Container } from "@/components/craft"
import Balancer from "react-wrap-balancer"
import { Clock, Brain, Sparkles } from "lucide-react"

type FeatureText = {
  icon: JSX.Element
  title: string
  description: string
  accentColor: {
    bg: string
    text: string
    icon: string
  }
}

const featureText: FeatureText[] = [
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Úspora Času",
    description:
      "Automatické přiřazení kódů během několika sekund místo zdlouhavého manuálního vyhledávání. Ušetřete až 70% času při kódování diagnóz.",
    accentColor: {
      bg: "bg-accent-blue-muted",
      text: "text-accent-blue",
      icon: "text-accent-blue",
    },
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Vyšší Přesnost",
    description:
      "AI model trénovaný na rozsáhlé databázi MKN-11 zajišťuje konzistentní a přesné kódování s minimální chybovostí.",
    accentColor: {
      bg: "bg-accent-green-muted",
      text: "text-accent-green",
      icon: "text-accent-green",
    },
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Snadné Použití",
    description:
      "Intuitivní rozhraní nevyžadující žádné speciální školení. Stačí vložit text a systém automaticky navrhne nejvhodnější kódy.",
    accentColor: {
      bg: "bg-accent-purple-muted",
      text: "text-accent-purple",
      icon: "text-accent-purple",
    },
  },
]

const Feature = () => {
  return (
    <Section className="bg-secondary border-y border-muted">
      <Container className="not-prose">
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-primary via-accent-blue to-accent-purple bg-clip-text text-transparent">
            <Balancer>
              Revoluční Způsob Kódování Diagnóz
            </Balancer>
          </h2>
          <h3 className="text-xl text-muted-foreground text-center font-body">
            <Balancer>
              Kombinujeme nejmodernější AI technologie s rozsáhlou databází MKN-11 
              pro rychlejší a přesnější kódování zdravotnické dokumentace
            </Balancer>
          </h3>

          <div className="mt-8 grid gap-8 md:mt-16 md:grid-cols-3">
            {featureText.map(({ icon, title, description, accentColor }, index) => (
              <div 
                className="group flex flex-col gap-6 p-8 bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" 
                key={index}
              >
                <div className={`${accentColor.bg} p-4 rounded-xl shadow-sm w-fit group-hover:shadow-md transition-shadow duration-300`}>
                  <div className={accentColor.icon}>
                    {icon}
                  </div>
                </div>
                <h4 className={`text-xl font-bold ${accentColor.text}`}>{title}</h4>
                <p className="text-muted-foreground font-body leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default Feature
