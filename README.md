# MKN-11 Asistované Kódování

![MKN11 Cover](https://utfs.io/f/NyKlEsePJFL1Zxkg6CHqH52V3xpRUZkbs9AW0PMgyzmDavhY)

Systém pro asistované kódování diagnóz podle standardu MKN-11 s využitím umělé inteligence. Cílem je zjednodušit a zrychlit proces kódování při zachování přesnosti výsledků.

## Klíčové Funkce

*   **Extrakce diagnóz pomocí AI:** Využívá model OpenAI GPT-4 k identifikaci a extrakci lékařských diagnóz z nestrukturovaného textu.
*   **Návrh MKN-11 kódů:** Pro extrahované diagnózy navrhuje odpovídající kódy z Mezinárodní klasifikace nemocí (11. revize).
*   **Ohodnocení spolehlivosti:** Poskytuje skóre spolehlivosti pro navržené kódy.
*   **Uživatelské rozhraní:** Moderní webové rozhraní postavené na Next.js a Tailwind CSS pro snadnou interakci.

## Technologie

*   **Framework:** Next.js 14.2.20, React 18.2.0
*   **Jazyk:** TypeScript
*   **Stylování:** Tailwind CSS, Shadcn/UI, `clsx`, `tailwind-merge`
*   **AI Model:** OpenAI GPT-4 (konkrétně model `gpt-4-turbo-preview`)
*   **Správa dat:** MKN-11 terminologie (JSON)
*   **API komunikace:** Axios
*   **Animace:** Framer Motion
*   **Ikony:** Lucide React, Tabler Icons
*   **Deployment:** Vercel (doporučeno)

## Struktura Projektu

```
mkn11/
├── src/
│   ├── app/                # Next.js App Router (stránky a API routes)
│   │   └── api/
│   │       └── code/       # API endpoint pro kódování diagnóz
│   ├── components/         # Znovupoužitelné React komponenty (UI, formuláře, atd.)
│   ├── data/               # Datové soubory (např. mkn11_terminology.json)
│   ├── lib/                # Pomocné funkce a utility (např. utils.ts, cn.ts)
│   └── types/              # TypeScript typové definice (např. terminology.ts)
├── public/                 # Statické soubory (obrázky, favicony)
├── .env.local.example      # Příklad souboru pro environmentální proměnné
├── next.config.js          # Konfigurace Next.js
├── tailwind.config.ts      # Konfigurace Tailwind CSS
├── tsconfig.json           # Konfigurace TypeScriptu
├── package.json            # Závislosti a skripty projektu
└── README.md               # Tento soubor
```

## Požadavky

*   Node.js 18+
*   npm nebo yarn (nebo jiný Node.js package manager)
*   OpenAI API klíč

## Konfigurace

1.  **Klonování repozitáře (pokud ještě nemáte):**
    ```bash
    git clone <URL_REPOZITARE>
    cd mkn11
    ```

2.  **Vytvoření souboru pro environmentální proměnné:**
    Zkopírujte soubor `.env.local.example` (pokud existuje, jinak jej vytvořte) do `.env.local`:
    ```bash
    cp .env.local.example .env.local
    ```
    Otevřete `.env.local` a vložte váš OpenAI API klíč:
    ```env
    OPENAI_API_KEY=sk_váš_tajný_api_klíč
    ```

## Instalace a Spuštění

1.  **Instalace závislostí:**
    ```bash
    npm install
    ```
    nebo pokud používáte yarn:
    ```bash
    yarn install
    ```

2.  **Spuštění vývojového serveru:**
    ```bash
    npm run dev
    ```
    nebo
    ```bash
    yarn dev
    ```
    Aplikace bude dostupná na [http://localhost:3000](http://localhost:3000).

3.  **Build pro produkci:**
    ```bash
    npm run build
    ```
    nebo
    ```bash
    yarn build
    ```

4.  **Spuštění produkčního buildu lokálně:**
    ```bash
    npm run start
    ```
    nebo
    ```bash
    yarn start
    ```

5.  **Linting kódu:**
    ```bash
    npm run lint
    ```
    nebo
    ```bash
    yarn lint
    ```

## Deployment na Vercel

1.  Propojte váš GitHub (nebo jiný Git provider) repozitář s vaším Vercel účtem.
2.  V nastavení projektu na Vercelu přidejte environmentální proměnnou `OPENAI_API_KEY` s vaším API klíčem.
3.  Vercel automaticky detekuje Next.js projekt a nastaví build a deployment proces.
4.  Každý push do hlavní větve (např. `main` nebo `master`) může automaticky spustit nový deployment.

## API Dokumentace

### Hlavní Endpoint pro Kódování

`POST /api/code`

Tento endpoint přijímá text obsahující lékařské diagnózy a vrací pole navržených MKN-11 kódů s doplňujícími informacemi.

**Request Body:**

```json
{
  "text": "Pacientka přichází s anamnézou diabetes mellitus 2. typu a nově diagnostikovanou arteriální hypertenzí. Stěžuje si na bolesti hlavy."
}
```

**Response Body (Příklad úspěšné odpovědi):**

```json
{
  "codes": [
    {
      "diagnosis": "diabetes mellitus 2. typu",
      "description": "Diabetes mellitus, type 2", // Popis z MKN-11 nebo z OpenAI
      "icd_code": "5A11", // Navržený MKN-11 kód
      "confidence": "high", // Odhadovaná spolehlivost (může být 'high'/'low' nebo číselné skóre)
      "is_preliminary": true, // Indikátor, zda je kód předběžný
      "score": 98.5 // Skóre podobnosti/spolehlivosti z interního porovnávání
    },
    {
      "diagnosis": "arteriální hypertenze",
      "description": "Essential (primary) hypertension",
      "icd_code": "BA00",
      "confidence": "high",
      "is_preliminary": true,
      "score": 95.0
    },
    {
      "diagnosis": "bolesti hlavy",
      "description": "Headache",
      "icd_code": "MB00", // Příklad kódu pro symptom
      "confidence": "low", // Nižší spolehlivost, pokud je to jen symptom
      "is_preliminary": true,
      "score": 85.0
    }
  ]
}
```

**Response Body (Příklad chyby):**

```json
{
  "error": "Chyba při zpracování diagnózy: Popis chyby"
}
```
*Status kód: 500 (nebo jiný relevantní chybový kód)*

## Autor

Petr Sovadina
- [LinkedIn](https://www.linkedin.com/in/petrsovadina)
- [Blog](https://portfolio-sovadina.vercel.app/blog)

---

*Tento projekt byl vytvořen jako součást ... (doplňte kontext, pokud je relevantní, např. bakalářská práce, osobní projekt atd.)*
```# MKN-11 Asistované Kódování

![MKN11 Cover](https://utfs.io/f/NyKlEsePJFL1Zxkg6CHqH52V3xpRUZkbs9AW0PMgyzmDavhY)

Systém pro asistované kódování diagnóz podle standardu MKN-11 s využitím umělé inteligence. Cílem je zjednodušit a zrychlit proces kódování při zachování přesnosti výsledků.

## Klíčové Funkce

*   **Extrakce diagnóz pomocí AI:** Využívá model OpenAI GPT-4 k identifikaci a extrakci lékařských diagnóz z nestrukturovaného textu.
*   **Návrh MKN-11 kódů:** Pro extrahované diagnózy navrhuje odpovídající kódy z Mezinárodní klasifikace nemocí (11. revize).
*   **Ohodnocení spolehlivosti:** Poskytuje skóre spolehlivosti pro navržené kódy.
*   **Uživatelské rozhraní:** Moderní webové rozhraní postavené na Next.js a Tailwind CSS pro snadnou interakci.

## Technologie

*   **Framework:** Next.js 14.2.20, React 18.2.0
*   **Jazyk:** TypeScript
*   **Stylování:** Tailwind CSS, Shadcn/UI, `clsx`, `tailwind-merge`
*   **AI Model:** OpenAI GPT-4 (konkrétně model `gpt-4-turbo-preview`)
*   **Správa dat:** MKN-11 terminologie (JSON)
*   **API komunikace:** Axios
*   **Animace:** Framer Motion
*   **Ikony:** Lucide React, Tabler Icons
*   **Deployment:** Vercel (doporučeno)

## Struktura Projektu

```
mkn11/
├── src/
│   ├── app/                # Next.js App Router (stránky a API routes)
│   │   └── api/
│   │       └── code/       # API endpoint pro kódování diagnóz
│   ├── components/         # Znovupoužitelné React komponenty (UI, formuláře, atd.)
│   ├── data/               # Datové soubory (např. mkn11_terminology.json)
│   ├── lib/                # Pomocné funkce a utility (např. utils.ts, cn.ts)
│   └── types/              # TypeScript typové definice (např. terminology.ts)
├── public/                 # Statické soubory (obrázky, favicony)
├── .env.local.example      # Příklad souboru pro environmentální proměnné
├── next.config.js          # Konfigurace Next.js
├── tailwind.config.ts      # Konfigurace Tailwind CSS
├── tsconfig.json           # Konfigurace TypeScriptu
├── package.json            # Závislosti a skripty projektu
└── README.md               # Tento soubor
```

## Požadavky

*   Node.js 18+
*   npm nebo yarn (nebo jiný Node.js package manager)
*   OpenAI API klíč

## Konfigurace

1.  **Klonování repozitáře (pokud ještě nemáte):**
    ```bash
    git clone <URL_REPOZITARE>
    cd mkn11
    ```

2.  **Vytvoření souboru pro environmentální proměnné:**
    Zkopírujte soubor `.env.local.example` (pokud existuje, jinak jej vytvořte) do `.env.local`:
    ```bash
    cp .env.local.example .env.local
    ```
    Otevřete `.env.local` a vložte váš OpenAI API klíč:
    ```env
    OPENAI_API_KEY=sk_váš_tajný_api_klíč
    ```

## Instalace a Spuštění

1.  **Instalace závislostí:**
    ```bash
    npm install
    ```
    nebo pokud používáte yarn:
    ```bash
    yarn install
    ```

2.  **Spuštění vývojového serveru:**
    ```bash
    npm run dev
    ```
    nebo
    ```bash
    yarn dev
    ```
    Aplikace bude dostupná na [http://localhost:3000](http://localhost:3000).

3.  **Build pro produkci:**
    ```bash
    npm run build
    ```
    nebo
    ```bash
    yarn build
    ```

4.  **Spuštění produkčního buildu lokálně:**
    ```bash
    npm run start
    ```
    nebo
    ```bash
    yarn start
    ```

5.  **Linting kódu:**
    ```bash
    npm run lint
    ```
    nebo
    ```bash
    yarn lint
    ```

## Deployment na Vercel

1.  Propojte váš GitHub (nebo jiný Git provider) repozitář s vaším Vercel účtem.
2.  V nastavení projektu na Vercelu přidejte environmentální proměnnou `OPENAI_API_KEY` s vaším API klíčem.
3.  Vercel automaticky detekuje Next.js projekt a nastaví build a deployment proces.
4.  Každý push do hlavní větve (např. `main` nebo `master`) může automaticky spustit nový deployment.

## API Dokumentace

### Hlavní Endpoint pro Kódování

`POST /api/code`

Tento endpoint přijímá text obsahující lékařské diagnózy a vrací pole navržených MKN-11 kódů s doplňujícími informacemi.

**Request Body:**

```json
{
  "text": "Pacientka přichází s anamnézou diabetes mellitus 2. typu a nově diagnostikovanou arteriální hypertenzí. Stěžuje si na bolesti hlavy."
}
```

**Response Body (Příklad úspěšné odpovědi):**

```json
{
  "codes": [
    {
      "diagnosis": "diabetes mellitus 2. typu",
      "description": "Diabetes mellitus, type 2", // Popis z MKN-11 nebo z OpenAI
      "icd_code": "5A11", // Navržený MKN-11 kód
      "confidence": "high", // Odhadovaná spolehlivost (může být 'high'/'low' nebo číselné skóre)
      "is_preliminary": true, // Indikátor, zda je kód předběžný
      "score": 98.5 // Skóre podobnosti/spolehlivosti z interního porovnávání
    },
    {
      "diagnosis": "arteriální hypertenze",
      "description": "Essential (primary) hypertension",
      "icd_code": "BA00",
      "confidence": "high",
      "is_preliminary": true,
      "score": 95.0
    },
    {
      "diagnosis": "bolesti hlavy",
      "description": "Headache",
      "icd_code": "MB00", // Příklad kódu pro symptom
      "confidence": "low", // Nižší spolehlivost, pokud je to jen symptom
      "is_preliminary": true,
      "score": 85.0
    }
  ]
}
```

**Response Body (Příklad chyby):**

```json
{
  "error": "Chyba při zpracování diagnózy: Popis chyby"
}
```
*Status kód: 500 (nebo jiný relevantní chybový kód)*

## Autor

Petr Sovadina
- [LinkedIn](https://www.linkedin.com/in/petrsovadina)
- [Blog](https://portfolio-sovadina.vercel.app/blog)

---

*Tento projekt byl vytvořen jako součást ... (doplňte kontext, pokud je relevantní, např. bakalářská práce, osobní projekt atd.)*