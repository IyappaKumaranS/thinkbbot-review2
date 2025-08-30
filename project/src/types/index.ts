export interface ValidationScore {
  category: string;
  score: number;
  explanation: string;
  icon: React.ReactNode;
  color: string;
}

export interface Suggestion {
  category: string;
  tip: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Competitor {
  name: string;
  description: string;
  website: string;
  category: string;
  similarity: number;
}

export interface ValidationHistory {
  id: string;
  title: string;
  date: string;
  averageScore: number;
  type: string;
  scores?: ValidationScore[];
  suggestions?: Suggestion[];
  competitors?: Competitor[];
}

export interface AnalysisResult {
  scores: ValidationScore[];
  suggestions: Suggestion[];
  competitors: Competitor[];
}