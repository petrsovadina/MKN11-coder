import DiagnosisForm from '@/components/DiagnosisForm'

export default function AppPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          MKN-11 Automatické Kódování
        </h1>
        <DiagnosisForm />
      </div>
    </main>
  )
}
