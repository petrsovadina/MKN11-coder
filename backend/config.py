"""
Konfigurace aplikace s pevně nastavenými hodnotami.
"""

from typing import Dict, Any

# API URLs
BACKEND_URL: str = "http://localhost:8000"
FRONTEND_URL: str = "http://localhost:3000"

# Datové soubory
MKN11_EXCEL_PATH: str = "./data/mkn-11-terminologie-202403.xlsx"

# Nastavení prostředí
DEBUG: bool = True
NODE_ENV: str = "development"

# API konfigurace
API_V1_PREFIX: str = "/api/v1"
PROJECT_NAME: str = "MKN-11 Asistované Kódování"
VERSION: str = "1.0.0"
DESCRIPTION: str = """
API pro asistované kódování diagnóz podle standardu MKN-11 s využitím umělé inteligence.
"""

# CORS nastavení
ALLOWED_HOSTS: list[str] = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
]

# Cache nastavení
CACHE_TTL: int = 60 * 60  # 1 hodina
MAX_CACHE_SIZE: int = 1000

# Limity API
RATE_LIMIT_PER_MINUTE: int = 60
MAX_REQUEST_SIZE_MB: int = 10

def get_settings() -> Dict[str, Any]:
    """
    Vrátí všechna nastavení jako slovník.
    """
    return {
        "backend_url": BACKEND_URL,
        "frontend_url": FRONTEND_URL,
        "mkn11_excel_path": MKN11_EXCEL_PATH,
        "debug": DEBUG,
        "node_env": NODE_ENV,
        "api_v1_prefix": API_V1_PREFIX,
        "project_name": PROJECT_NAME,
        "version": VERSION,
        "description": DESCRIPTION,
        "allowed_hosts": ALLOWED_HOSTS,
        "cache_ttl": CACHE_TTL,
        "max_cache_size": MAX_CACHE_SIZE,
        "rate_limit_per_minute": RATE_LIMIT_PER_MINUTE,
        "max_request_size_mb": MAX_REQUEST_SIZE_MB,
    }
