export interface StartupIdea {
  id: string;
  idea: string;
  targetAudience: string;
  industry: string;
  geography: string;
  revenueModel: string;
  teamSize: string;
  createdAt: Date;
}

export interface RiskAnalysis {
  id: string;
  overallScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  competitionRisk: number;
  marketDemand: number;
  vcScore: number;
  executionRisk: number;
  createdAt: Date;
}

export interface ResearchFinding {
  id: string;
  type: 'competition' | 'market' | 'vc';
  title: string;
  content: string;
  evidence: string[];
}

export interface PivotSuggestion {
  id: string;
  originalIdea: string;
  suggestedPivot: string;
  reasoning: string[];
  oldRiskScore: number;
  newRiskScore: number;
}

export interface RoadmapMilestone {
  id: string;
  week: number;
  day?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface AssumptionValidation {
  id: string;
  assumption: string;
  experiment: string;
  duration: string;
  completed: boolean;
  notes: string;
}

export interface SessionHistory {
  id: string;
  ideaTitle: string;
  date: Date;
  riskScore: number;
  status: 'completed' | 'in-progress' | 'draft';
  industry: string;
}
