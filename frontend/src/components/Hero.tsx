import Link from "next/link"
import Image from "next/image"
import Balancer from "react-wrap-balancer"
import { FileText, BookOpen } from "lucide-react"
import { Section, Container } from "@/components/craft"
import { Button } from "@/components/ui/button"
import { HyperText } from "@/components/magicui/hyper-text"

const Hero = () => {
  return (
    <Section className="bg-background border-b border-border">
      <Container className="flex flex-col items-center text-center max-w-[800px]">
        <div className="mb-10 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="MKN-11 Logo"
            width={150}
            height={150}
            className="h-24 w-auto object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          <Balancer>
            Automatické Kódování{" "}
            <HyperText
              duration={1200}
              delay={500}
              startOnView={true}
              animateOnHover={true}
            >
              MKN-11
            </HyperText>
          </Balancer>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
          <Balancer>
            Zjednodušte proces kódování diagnóz pomocí umělé inteligence. 
            Ušetřete čas a zvyšte přesnost vašeho kódování.
          </Balancer>
        </p>
        <div className="flex gap-3">
          <Button 
            asChild 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/app" className="text-base font-medium">
              <FileText className="mr-2 h-4 w-4" />
              Vyzkoušet Zdarma
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              API Dokumentace
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}

export default Hero
