'use client'

import { useState } from 'react'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'

interface Diagnosis {
  diagnosis: string
  description: string
  icd_code: string
  confidence: string
  is_preliminary: boolean
  score: number
}

export default function DiagnosisForm() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:8000/api/code', { text })
      setDiagnoses(response.data.codes)
      toast({
        title: 'Úspěch',
        description: 'Diagnózy byly úspěšně extrahovány',
      })
    } catch (error) {
      console.error('Chyba při zpracování:', error)
      toast({
        title: 'Chyba',
        description: 'Nastala chyba při zpracování textu',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'text-green-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="text" className="block text-lg font-medium">
            Text lékařské zprávy
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-40 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
            placeholder="Vložte text lékařské zprávy..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 font-medium text-lg"
          disabled={loading}
        >
          {loading ? 'Zpracovávám...' : 'Analyzovat'}
        </button>
      </form>

      {diagnoses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Nalezené diagnózy:</h2>
          <div className="space-y-4">
            {diagnoses.map((diagnosis, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg bg-card shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-medium">
                      {diagnosis.diagnosis}
                      {diagnosis.is_preliminary && (
                        <span className="ml-2 text-sm text-yellow-600 font-normal">
                          (předběžná)
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {diagnosis.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium">Kód MKN-11:</p>
                    <p className="text-xl font-bold">{diagnosis.icd_code}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <p className={getConfidenceColor(diagnosis.confidence)}>
                    Důvěryhodnost: {diagnosis.confidence.toUpperCase()}
                  </p>
                  <p className="text-muted-foreground">
                    Shoda: {Math.round(diagnosis.score)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
