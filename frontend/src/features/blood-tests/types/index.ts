export interface BloodTest {
  id: string;
  userId: string;
  date: string;
  values: Record<string, number>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BloodTestFormData {
  date: string;
  values: Record<string, string>;
  notes?: string;
}

export interface BloodTestResult {
  marker: string;
  value: number;
  unit: string;
  status: 'optimal' | 'suboptimal' | 'deficient' | 'elevated' | 'low';
  optimalRange: string;
  description: string;
  recommendations?: string[];
}

export interface BloodTestAnalysis {
  testId: string;
  testDate: string;
  overallStatus: 'excellent' | 'good' | 'fair' | 'poor';
  results: BloodTestResult[];
  summary: string;
  recommendations: string[];
  priorityAreas: {
    category: string;
    markers: string[];
    severity: 'high' | 'medium' | 'low';
  }[];
}

export interface BloodTestTrend {
  date: string;
  values: Record<string, number>;
}

export interface BloodTestComparison {
  marker: string;
  currentValue: number;
  previousValue?: number;
  change?: number;
  changePercentage?: number;
  unit: string;
  optimalRange: string;
  status: 'improved' | 'worsened' | 'unchanged' | 'new';
}
