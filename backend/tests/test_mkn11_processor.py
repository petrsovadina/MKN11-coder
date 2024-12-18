import pytest
from app.mkn11_processor import MKN11Processor
import pandas as pd
import os

@pytest.fixture
def sample_data():
    # Vytvoření vzorových dat pro testy
    data = {
        'code': ['BA00', 'BA01', 'BA02'],
        'title': ['Hypertenze', 'Diabetes mellitus', 'Astma'],
        'description': ['Vysoký krevní tlak', 'Porucha metabolismu', 'Dýchací potíže'],
        'synonyms': ['Vysoký tlak', 'Cukrovka', 'Průduškové astma']
    }
    return pd.DataFrame(data)

@pytest.fixture
def mkn11_processor(tmp_path, sample_data):
    # Vytvoření dočasného Excel souboru s testovacími daty
    excel_path = tmp_path / "test_data.xlsx"
    sample_data.to_excel(excel_path, index=False)
    return MKN11Processor(str(excel_path))

def test_load_data(mkn11_processor):
    """Test načtení dat z Excel souboru."""
    assert mkn11_processor.terminology_data is not None
    assert len(mkn11_processor.terminology_data) == 3

def test_search_diagnosis(mkn11_processor):
    """Test vyhledávání diagnóz."""
    results = mkn11_processor.search_diagnosis("pacient má vysoký tlak")
    assert len(results) > 0
    assert any(r['code'] == 'BA00' for r in results)

def test_get_diagnosis_by_code(mkn11_processor):
    """Test získání diagnózy podle kódu."""
    result = mkn11_processor.get_diagnosis_by_code('BA00')
    assert result is not None
    assert result['code'] == 'BA00'
    assert result['title'] == 'Hypertenze'

def test_validate_code(mkn11_processor):
    """Test validace kódu."""
    assert mkn11_processor.validate_code('BA00') is True
    assert mkn11_processor.validate_code('XXX99') is False
