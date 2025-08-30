
import { ValidationScore, Suggestion, Competitor } from './index';

export interface PipelineResult {
  scores?: ValidationScore[];
  suggestions?: Suggestion[];
  competitors?: Competitor[];
  error?: string;
}
