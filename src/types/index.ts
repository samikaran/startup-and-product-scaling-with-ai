export interface Feature {
  id: string;
  name: string;
  description: string;
  priority: number;
  status: "planned" | "in_progress" | "completed";
  impact: number;
  effort: number;
}

export interface Feedback {
  id: string;
  text: string;
  sentiment: "positive" | "negative" | "neutral";
  source: string;
  createdAt: Date;
}

export interface BusinessMetric {
  id: string;
  name: string;
  value: number;
  trend: number;
  category: "revenue" | "costs" | "growth" | "efficiency";
  period: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  performance: number;
  goals: string[];
}
