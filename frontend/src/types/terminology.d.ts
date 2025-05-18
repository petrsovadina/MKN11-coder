export interface TerminologyItem {
  code: string;
  term: string;
  description?: string;
}

export interface DiagnosisMatch {
  code: string;
  term: string;
  score: number;
}
