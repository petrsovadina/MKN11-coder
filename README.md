# MKN11 Automatické Kódování

Systém pro automatické kódování diagnóz a výkonů z lékařských zpráv pomocí MKN-11/ICD-11 a OpenAI API.

## Popis Projektu

Tento projekt poskytuje nástroj pro automatické kódování lékařských diagnóz a výkonů z textových zpráv do standardizovaných kódů MKN-11/ICD-11. Využívá pokročilé AI modely od OpenAI pro zpracování přirozeného jazyka a mapování na odpovídající kódy.

## Technologie

- **Frontend:** Next.js, Shadcn/UI
- **Backend:** FastAPI (Python)
- **AI Model:** OpenAI GPT-4
- **Data:** MKN-11/ICD-11 terminologie
- **Kontejnerizace:** Docker

## Struktura Projektu

```
mkn11/
├── backend/         # FastAPI backend
│   ├── app/        # Aplikační kód
│   ├── tests/      # Testy
│   └── data/       # Zpracovaná data
├── frontend/       # Next.js frontend
│   ├── src/        # Zdrojový kód
│   └── public/     # Statické soubory
├── data/          # Zdrojová data MKN-11
└── docker/        # Docker konfigurace
```

## Požadavky

- Python 3.9+
- Node.js 18+
- Docker a Docker Compose
- OpenAI API klíč

## Konfigurace

1. Vytvořte soubor `.env` v kořenovém adresáři:
   ```env
   OPENAI_API_KEY=váš-api-klíč
   MODEL_NAME=gpt-4-1106-preview
   MAX_TOKENS=2000
   TEMPERATURE=0.3
   ```

## Instalace a Spuštění

### Pomocí Dockeru (Doporučeno)

1. Sestavte a spusťte kontejnery:
   ```bash
   docker-compose up --build
   ```

2. Aplikace bude dostupná na:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Manuální Spuštění

1. Backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # nebo `venv\Scripts\activate` na Windows
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

2. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## API Endpointy

### POST /api/code
Kódování lékařského textu:
```json
{
  "text": "Pacient trpí hypertenzí a diabetes mellitus."
}
```

Odpověď:
```json
{
  "codes": [
    {
      "diagnosis": "Hypertenze",
      "icd_code": "BA00"
    },
    {
      "diagnosis": "Diabetes mellitus",
      "icd_code": "5A10"
    }
  ]
}
```

## Vývoj

- Pro přidání nových funkcí vytvořte novou větev
- Dodržujte konvence pro commit zprávu
- Před commitem spusťte testy

## Licence

Tento projekt je interní software. Všechna práva vyhrazena.
