import Hero from "@/components/Hero"
import { HowItWorks } from "@/components/HowItWorks"
import { Section, Container } from "@/components/craft"
import { Navbar } from "@/components/Navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <Section>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Automatické kódování diagnóz pomocí MKN-11
                </h2>
                <p className="text-muted-foreground">
                  Vyvíjím systém pro asistované kódování diagnóz podle standardu MKN-11 
                  s využitím umělé inteligence. Mým cílem je zjednodušit a zrychlit 
                  proces kódování při zachování přesnosti výsledků.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-lg bg-transparent border border-border">
                  <div className="text-2xl font-bold mb-2">MKN-11</div>
                  <div className="text-sm text-muted-foreground">Nejnovější verze standardu</div>
                </div>
                <div className="p-6 rounded-lg bg-transparent border border-border">
                  <div className="text-2xl font-bold mb-2">AI</div>
                  <div className="text-sm text-muted-foreground">Asistované kódování</div>
                </div>
                <div className="p-6 rounded-lg bg-transparent border border-border">
                  <div className="text-2xl font-bold mb-2">CZ</div>
                  <div className="text-sm text-muted-foreground">Podpora češtiny</div>
                </div>
                <div className="p-6 rounded-lg bg-transparent border border-border">
                  <div className="text-2xl font-bold mb-2">Web</div>
                  <div className="text-sm text-muted-foreground">Bez instalace</div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
        <HowItWorks />
      </main>
    </>
  )
}
