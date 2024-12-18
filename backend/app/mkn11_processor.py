import pandas as pd
from typing import Dict, List, Optional
import os
import re
from thefuzz import fuzz

class MKN11Processor:
    def __init__(self, excel_path: str):
        self.excel_path = excel_path
        self.terminology_data = None
        self._load_data()

    def _load_data(self) -> None:
        """Načte data z Excel souboru MKN-11."""
        try:
            # Načteme Excel soubor
            self.terminology_data = pd.read_excel(
                self.excel_path,
                engine='openpyxl'
            )
            
            # Očistíme data a připravíme je pro použití
            self.terminology_data = self.terminology_data.fillna('')
            
            # Vypíšeme dostupné sloupce pro debugging
            print("Dostupné sloupce:", self.terminology_data.columns.tolist())
            
            # Předpokládáme, že Excel má sloupce: ID, LabelCS, LabelEN, atd.
            required_columns = ['ID', 'LabelCS', 'LabelEN']
            
            # Kontrola existence požadovaných sloupců
            missing_columns = [col for col in required_columns if col not in self.terminology_data.columns]
            if missing_columns:
                raise ValueError(f"Chybějící sloupce v Excel souboru: {missing_columns}")
            
            # Přejmenujeme sloupce pro interní použití
            column_mapping = {
                'ID': 'code',
                'LabelCS': 'title',
                'LabelEN': 'title_en',
                'PropertyTranslation': 'description'
            }
            self.terminology_data = self.terminology_data.rename(columns=column_mapping)
            
            # Přidáme prázdný sloupec pro synonyma, pokud neexistuje
            if 'synonyms' not in self.terminology_data.columns:
                self.terminology_data['synonyms'] = ''
                
            # Vytvoření vyhledávacího indexu pro rychlejší vyhledávání
            self._create_search_index()
            
        except Exception as e:
            print(f"Chyba při načítání Excel souboru: {str(e)}")
            raise

    def _create_search_index(self) -> None:
        """Vytvoří vyhledávací index pro rychlejší vyhledávání."""
        # Vytvoříme seznam všech termínů pro každý záznam
        self.search_terms = {}
        for _, row in self.terminology_data.iterrows():
            terms = []
            # Přidáme český název
            if row['title']:
                terms.append(row['title'])
            # Přidáme anglický název
            if row['title_en']:
                terms.append(row['title_en'])
            # Přidáme popis
            if row['description']:
                terms.append(row['description'])
            # Přidáme synonyma, pokud existují
            if row['synonyms']:
                terms.extend(str(row['synonyms']).split(','))
            
            # Uložíme všechny termy pro tento kód
            self.search_terms[row['code']] = terms

    def find_matching_codes(self, text: str, threshold: float = 60.0) -> List[Dict]:
        """
        Najde odpovídající kódy MKN-11 pro zadaný text.
        
        Args:
            text: Text k analýze
            threshold: Minimální skóre shody (0-100)
            
        Returns:
            Seznam nalezených kódů s jejich skóre shody
        """
        results = []
        
        # Projdeme všechny kódy a jejich termy
        for code, terms in self.search_terms.items():
            max_score = 0
            matching_term = ""
            
            # Pro každý term spočítáme skóre shody
            for term in terms:
                score = fuzz.token_sort_ratio(text.lower(), str(term).lower())
                if score > max_score:
                    max_score = score
                    matching_term = term
            
            # Pokud je skóre vyšší než threshold, přidáme kód do výsledků
            if max_score >= threshold:
                # Najdeme řádek v DataFrame podle kódu
                row = self.terminology_data[self.terminology_data['code'] == code].iloc[0]
                
                results.append({
                    "code": code,
                    "title": row['title'],
                    "title_en": row['title_en'],
                    "description": row['description'],
                    "score": max_score,
                    "matching_term": matching_term
                })
        
        # Seřadíme výsledky podle skóre sestupně
        results = sorted(results, key=lambda x: x['score'], reverse=True)
        
        # Pokud nemáme žádné výsledky nad prahem, vrátíme alespoň jeden nejlepší výsledek
        if not results:
            max_score = 0
            best_match = None
            for code, terms in self.search_terms.items():
                for term in terms:
                    score = fuzz.token_sort_ratio(text.lower(), str(term).lower())
                    if score > max_score:
                        max_score = score
                        row = self.terminology_data[self.terminology_data['code'] == code].iloc[0]
                        best_match = {
                            "code": code,
                            "title": row['title'],
                            "title_en": row['title_en'],
                            "description": row['description'],
                            "score": score,
                            "matching_term": term
                        }
            if best_match:
                results = [best_match]
        
        return results

    def get_diagnosis_by_code(self, code: str) -> Optional[Dict]:
        """
        Získá informace o diagnóze podle kódu.
        
        Args:
            code: MKN-11 kód
            
        Returns:
            Dict: Informace o diagnóze nebo None
        """
        try:
            row = self.terminology_data[self.terminology_data['code'] == code].iloc[0]
            return {
                "code": code,
                "title": row['title'],
                "title_en": row['title_en'],
                "description": row['description']
            }
        except (IndexError, KeyError):
            return None

    def validate_code(self, code: str) -> bool:
        """
        Ověří, zda je kód platný podle MKN-11.
        
        Args:
            code: MKN-11 kód k ověření
            
        Returns:
            bool: True pokud je kód platný
        """
        return code in self.search_terms
