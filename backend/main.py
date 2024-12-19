from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(
    title="MKN-11 API",
    description="API pro asistované kódování diagnóz pomocí MKN-11",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS nastavení
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Pro produkci nastavit konkrétní domény
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modely
class DiagnosisInput(BaseModel):
    text: str
    language: Optional[str] = "cs"

class DiagnosisCode(BaseModel):
    code: str
    description: str
    confidence: float

class DiagnosisResponse(BaseModel):
    diagnosis: str
    codes: List[DiagnosisCode]

# Endpointy
@app.post("/api/code", response_model=List[DiagnosisResponse])
async def code_diagnosis(input: DiagnosisInput):
    """
    Analyzuje text lékařské zprávy a vrátí odpovídající kódy MKN-11.
    
    - **text**: Text lékařské zprávy k analýze
    - **language**: Jazyk textu (výchozí: cs)
    
    Vrací seznam nalezených diagnóz a jejich kódů MKN-11.
    """
    try:
        # TODO: Implementace analýzy textu pomocí OpenAI
        return [
            DiagnosisResponse(
                diagnosis="Hypertenze",
                codes=[
                    DiagnosisCode(
                        code="BA00",
                        description="Esenciální hypertenze",
                        confidence=0.95
                    )
                ]
            )
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    """
    Kontrola stavu API.
    """
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
