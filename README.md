# MKN-11 Asistované Kódování

![MKN11 Cover](https://utfs.io/f/NyKlEsePJFL1Zxkg6CHqH52V3xpRUZkbs9AW0PMgyzmDavhY)

Vyvíjím systém pro asistované kódování diagnóz podle standardu MKN-11 s využitím umělé inteligence. Mým cílem je zjednodušit a zrychlit proces kódování při zachování přesnosti výsledků.

## Technologie

- **Frontend:** Next.js 14, Tailwind CSS, Shadcn/UI
- **AI Model:** OpenAI GPT-4
- **Data:** MKN-11 terminologie
- **Serverless:** Vercel

## Struktura Projektu

```
mkn11/
├── frontend/       # Next.js frontend + API
│   ├── src/
│   │   ├── app/   # Pages a API routes
│   │   └── data/  # MKN-11 data
│   └── public/    # Statické soubory
└── docs/         # Dokumentace
```

## Požadavky

- Node.js 18+
- OpenAI API klíč
- Vercel účet (pro deployment)

## Konfigurace

1. Vytvořte soubor `.env` v adresáři frontend:
   ```env
   OPENAI_API_KEY=váš-api-klíč
   ```

## Instalace a Spuštění

### Lokální Vývoj

```bash
cd frontend
npm install
npm run dev
```

Aplikace bude dostupná na http://localhost:3000

### Deployment na Vercel

1. Propojte váš GitHub repozitář s Vercelem
2. Nastavte environment proměnnou `OPENAI_API_KEY` v nastavení projektu
3. Spusťte deployment

## API Dokumentace

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
      "description": "Hypertenzní onemocnění",
      "icd_code": "BA00",
      "confidence": "high",
      "is_preliminary": true,
      "score": 95.5
    }
  ]
}
```

## Autor

Petr Sovadina
- [LinkedIn](https://www.linkedin.com/in/petrsovadina)
- [Blog](https://portfolio-sovadina.vercel.app/blog)
