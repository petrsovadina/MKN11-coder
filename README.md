# MKN11 Automatické Kódování

Systém pro automatické kódování diagnóz a výkonů z lékařských zpráv pomocí MKN-11/ICD-11.

## Struktura Projektu

```
mkn11/
├── backend/         # FastAPI backend
├── frontend/        # Next.js frontend
├── data/           # Datové soubory MKN-11 a ICD-11
└── docker/         # Docker konfigurace
```

## Požadavky

- Python 3.9+
- Node.js 18+
- Docker

## Instalace

1. Klonujte repozitář
2. Nainstalujte závislosti:
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt
   
   # Frontend
   cd frontend
   npm install
   ```

## Spuštění

### Vývojové prostředí

1. Backend:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

### Produkční prostředí

```bash
docker-compose up
```

## API Dokumentace

API dokumentace je dostupná na `/docs` po spuštění backend serveru.
