import React, { createContext, useContext, ReactNode } from 'react';
import { BloodTest, BloodTestAnalysis } from '../types';

interface BloodTestContextType {
  bloodTests: BloodTest[];
  isLoading: boolean;
  error: Error | null;
  selectedTest: BloodTest | null;
  analysis: BloodTestAnalysis | null;
  fetchBloodTests: () => Promise<void>;
  saveBloodTest: (testData: Omit<BloodTest, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<BloodTest>;
  analyzeTest: (test: BloodTest) => void;
  deleteBloodTest: (testId: string) => Promise<void>;
}

const BloodTestContext = createContext<BloodTestContextType | undefined>(undefined);

export function BloodTestProvider({ children }: { children: ReactNode }) {
  // Import the hook here to avoid circular dependencies
  const useBloodTests = () => {
    const { useState, useEffect, useCallback } = React;
    
    const [bloodTests, setBloodTests] = useState<BloodTest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [selectedTest, setSelectedTest] = useState<BloodTest | null>(null);
    const [analysis, setAnalysis] = useState<BloodTestAnalysis | null>(null);
    
    // Mock data - would be replaced with API calls in production
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
      };

      if (process.env.NODE_ENV === 'development') {
        // In development, update local state
        setBloodTests(prev => [...prev, newTest]);
        return newTest;
      }

      // In production, make API call
      const response = await fetch('/api/blood-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create blood test');
      }
      
      const createdTest = await response.json();
      setBloodTests(prev => [...prev, createdTest]);
      return createdTest;
    } catch (err) {
      setError(err as Error);
      console.error('Error creating blood test:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateBloodTest = useCallback(async (id: string, updates: Partial<BloodTest>): Promise<BloodTest> => {
    setIsLoading(true);
    setError(null);
    try {
      if (process.env.NODE_ENV === 'development') {
        // In development, update local state
        const updatedTests = bloodTests.map(test => 
          test.id === id ? { ...test, ...updates, updatedAt: new Date().toISOString() } : test
        );
        setBloodTests(updatedTests);
        return updatedTests.find(test => test.id === id)!;
      }

      // In production, make API call
      const response = await fetch(`/api/blood-tests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update blood test');
      }
      
      const updatedTest = await response.json();
      setBloodTests(prev => 
        prev.map(test => test.id === id ? updatedTest : test)
      );
      return updatedTest;
    } catch (err) {
      setError(err as Error);
      console.error('Error updating blood test:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [bloodTests]);

  const deleteBloodTest = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      if (process.env.NODE_ENV === 'development') {
        // In development, update local state
        setBloodTests(prev => prev.filter(test => test.id !== id));
        return;
      }

      // In production, make API call
      const response = await fetch(`/api/blood-tests/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete blood test');
      }
      
      setBloodTests(prev => prev.filter(test => test.id !== id));
    } catch (err) {
      setError(err as Error);
      console.error('Error deleting blood test:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeBloodTest = useCallback((testId: string): BloodTestAnalysis => {
    const test = getBloodTest(testId);
    if (!test) {
      throw new Error(`Blood test with ID ${testId} not found`);
    }
    
    return analyzeBloodTest(test);
  }, [getBloodTest]);

  const getBloodTestTrends = useCallback((marker: string, limit: number = 5) => {
    // Sort tests by date in descending order and take the most recent ones
    const sortedTests = [...bloodTests]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
    
    // Extract the marker values and format them for the chart
    return sortedTests
      .map(test => ({
        date: format(new Date(test.date), 'MMM d, yyyy'),
        value: test.values[marker.toLowerCase()] as number | undefined
      }))
      .filter(item => item.value !== undefined) as { date: string; value: number }[];
  }, [bloodTests]);

  const compareBloodTests = useCallback((testId1: string, testId2: string) => {
    const test1 = getBloodTest(testId1);
    const test2 = getBloodTest(testId2);
    
    if (!test1 || !test2) {
      throw new Error('One or both blood tests not found');
    }
    
    // Create a comparison object for each marker that exists in both tests
    const comparison: Record<string, {
      test1Value: number;
      test2Value: number;
      difference: number;
      percentageChange: number;
      status: 'improved' | 'worsened' | 'unchanged' | 'new';
    }> = {};
    
    // Add all markers from both tests
    const allMarkers = new Set([...Object.keys(test1.values), ...Object.keys(test2.values)]);
    
    allMarkers.forEach(marker => {
      const value1 = test1.values[marker];
      const value2 = test2.values[marker];
      
      if (value1 !== undefined && value2 !== undefined) {
        // Both tests have this marker
        const difference = value2 - value1;
        const percentageChange = value1 !== 0 ? (difference / value1) * 100 : 0;
        
        let status: 'improved' | 'worsened' | 'unchanged' = 'unchanged';
        if (Math.abs(percentageChange) > 5) { // 5% threshold for change
          status = percentageChange > 0 ? 'increased' : 'decreased';
          
          // For some markers, higher is better, for others, lower is better
          // This is a simplified version - you'd want to make this more sophisticated
          const higherIsBetter = [
            'vitaminD', 'ferritin', 'vitaminB12', 'folate', 'testosterone', 'igf1', 'hdl'
          ];
          
          if (higherIsBetter.includes(marker)) {
            status = percentageChange > 0 ? 'improved' : 'worsened';
          } else {
            status = percentageChange < 0 ? 'improved' : 'worsened';
          }
        }
        
        comparison[marker] = {
          test1Value: value1,
          test2Value: value2,
          difference,
          percentageChange,
          status,
        };
      } else if (value1 === undefined && value2 !== undefined) {
        // New marker in test2
        comparison[marker] = {
          test1Value: 0,
          test2Value: value2,
          difference: value2,
          percentageChange: 100,
          status: 'new',
        };
      } else if (value1 !== undefined && value2 === undefined) {
        // Marker removed in test2
        comparison[marker] = {
          test1Value: value1,
          test2Value: 0,
          difference: -value1,
          percentageChange: -100,
          status: 'removed',
        };
      }
    });
    
    return {
      test1: {
        id: test1.id,
        date: test1.date,
      },
      test2: {
        id: test2.id,
        date: test2.date,
      },
      comparison,
      summary: {
        totalMarkers: Object.keys(comparison).length,
        improved: Object.values(comparison).filter(c => c.status === 'improved').length,
        worsened: Object.values(comparison).filter(c => c.status === 'worsened').length,
        unchanged: Object.values(comparison).filter(c => c.status === 'unchanged').length,
        newMarkers: Object.values(comparison).filter(c => c.status === 'new').length,
      },
    };
  }, [getBloodTest]);

  return (
    <BloodTestContext.Provider
      value={{
        bloodTests,
        isLoading,
        error,
        fetchBloodTests,
        getBloodTest,
        createBloodTest,
        updateBloodTest,
        deleteBloodTest,
        analyzeBloodTest,
        getBloodTestTrends,
        compareBloodTests,
      }}
    >
      {children}
    </BloodTestContext.Provider>
  );
};

export const useBloodTestContext = (): BloodTestContextType => {
  const context = useContext(BloodTestContext);
  if (context === undefined) {
    throw new Error('useBloodTestContext must be used within a BloodTestProvider');
  }
  return context;
};

export default BloodTestContext;
