# MKN-11 Asistované Kódování

![MKN11 Cover](https://utfs.io/f/NyKlEsePJFL1Zxkg6CHqH52V3xpRUZkbs9AW0PMgyzmDavhY)

Vyvíjím systém pro asistované kódování diagnóz podle standardu MKN-11 s využitím umělé inteligence. Mým cílem je zjednodušit a zrychlit proces kódování při zachování přesnosti výsledků.

## Technologie

- **Frontend:** Next.js 14, Tailwind CSS, Shadcn/UI, Framer Motion
- **Backend:** FastAPI (Python)
- **AI Model:** OpenAI GPT-4
- **Data:** MKN-11 terminologie
- **Kontejnerizace:** Docker

## Struktura Projektu

```
mkn11/
├── backend/         # FastAPI backend
│   ├── app/        # Aplikační kód
│   ├── tests/      # Testy
│   └── data/       # Data MKN-11
├── frontend/       # Next.js frontend
│   ├── src/        # Zdrojový kód
│   └── public/     # Statické soubory
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
   - API Dokumentace: http://localhost:8000/docs

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

## API Dokumentace

Kompletní API dokumentace je dostupná na `/docs` nebo `/redoc` endpointech běžícího backend serveru.

### Hlavní Endpoint

`POST /api/code`

Tento endpoint přijímá text lékařské zprávy a vrací relevantní MKN-11 kódy:

Request:
```json
{
  "text": "Pacient trpí hypertenzí."
}
```

Response:
```json
{
  "codes": [
    {
      "diagnosis": "Hypertenze",
      "code": "BA00",
      "description": "Hypertenzní onemocnění"
    }
  ]
}
```

## Autor

Petr Sovadina
- [LinkedIn](https://www.linkedin.com/in/petrsovadina)
- [Blog](https://portfolio-sovadina.vercel.app/blog)
