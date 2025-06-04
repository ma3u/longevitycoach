import { useState, useEffect, useCallback } from 'react';
import { BloodTest, BloodTestAnalysis } from '../types';
import { analyzeBloodTest } from '../utils/analyzeBloodTest';

// Mock data - replace with actual API calls in production
const MOCK_BLOOD_TESTS: BloodTest[] = [
  {
    id: '1',
    userId: 'user-1',
    date: '2025-05-28T10:00:00Z',
    values: {
      vitaminD: 65,
      ferritin: 120,
      crp: 0.8,
      hba1c: 5.2,
      tsh: 1.8,
      freeT3: 3.5,
      freeT4: 1.5,
      b12: 750,
      folate: 18,
      magnesium: 2.4,
    },
    notes: 'Routine checkup - all good',
    createdAt: '2025-05-28T10:00:00Z',
    updatedAt: '2025-05-28T10:00:00Z',
  },
  {
    id: '2',
    userId: 'user-1',
    date: '2025-01-15T10:00:00Z',
    values: {
      vitaminD: 42,
      ferritin: 85,
      crp: 2.1,
      hba1c: 5.6,
      tsh: 2.2,
      freeT3: 3.2,
      freeT4: 1.3,
      b12: 580,
      folate: 12,
      magnesium: 2.1,
    },
    notes: 'Follow-up after 3 months of supplementation',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
];

export function useBloodTests() {
  const [bloodTests, setBloodTests] = useState<BloodTest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedTest, setSelectedTest] = useState<BloodTest | null>(null);
  const [analysis, setAnalysis] = useState<BloodTestAnalysis | null>(null);

  // Fetch blood tests
  const fetchBloodTests = useCallback(async () => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      // const response = await fetch('/api/blood-tests');
      // const data = await response.json();
      // setBloodTests(data);
      
      // Using mock data for now
      setBloodTests(MOCK_BLOOD_TESTS);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch blood tests:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch blood tests'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save a new blood test
  const saveBloodTest = useCallback(async (testData: Omit<BloodTest, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      // const response = await fetch('/api/blood-tests', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(testData),
      // });
      // const newTest = await response.json();
      
      // Mock response
      const newTest: BloodTest = {
        ...testData,
        id: Date.now().toString(),
        userId: 'user-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setBloodTests(prev => [newTest, ...prev]);
      setSelectedTest(newTest);
      setAnalysis(analyzeBloodTest(newTest.values));
      
      return newTest;
    } catch (err) {
      console.error('Failed to save blood test:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Analyze a blood test
  const analyzeTest = useCallback((test: BloodTest) => {
    setSelectedTest(test);
    setAnalysis(analyzeBloodTest(test.values));
  }, []);

  // Delete a blood test
  const deleteBloodTest = useCallback(async (testId: string) => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      // await fetch(`/api/blood-tests/${testId}`, { method: 'DELETE' });
      
      setBloodTests(prev => prev.filter(test => test.id !== testId));
      if (selectedTest?.id === testId) {
        setSelectedTest(null);
        setAnalysis(null);
      }
    } catch (err) {
      console.error('Failed to delete blood test:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [selectedTest]);

  // Initial data fetch
  useEffect(() => {
    fetchBloodTests();
  }, [fetchBloodTests]);

  return {
    bloodTests,
    isLoading,
    error,
    selectedTest,
    analysis,
    fetchBloodTests,
    saveBloodTest,
    analyzeTest,
    deleteBloodTest,
  };
}
