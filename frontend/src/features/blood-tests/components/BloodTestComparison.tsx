import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BloodTest, BloodTestComparison as BloodTestComparisonType } from '../types';
import { formatValue, getMarkerDisplayName } from '../utils/formatBloodTest';

interface BloodTestComparisonProps {
  currentTest: BloodTest;
  previousTest: BloodTest;
  markers: string[];
}

export function BloodTestComparison({ currentTest, previousTest, markers }: BloodTestComparisonProps) {
  // Calculate comparison data
  const comparisonData = React.useMemo(() => {
    return markers.map((marker) => {
      const currentValue = currentTest.values[marker];
      const previousValue = previousTest.values[marker];
      
      if (currentValue === undefined || previousValue === undefined) {
        return null;
      }

      const change = currentValue - previousValue;
      const changePercentage = (change / previousValue) * 100;
      
      // Determine status based on change
      let status: 'improved' | 'worsened' | 'unchanged' | 'new' = 'unchanged';
      if (Math.abs(changePercentage) < 1) {
        status = 'unchanged';
      } else if (change > 0) {
        status = 'increased';
      } else {
        status = 'decreased';
      }

      return {
        marker,
        currentValue,
        previousValue,
        change,
        changePercentage,
        status,
      };
    }).filter(Boolean) as BloodTestComparisonType[];
  }, [currentTest, previousTest, markers]);

  // Get badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'improved':
        return 'success';
      case 'worsened':
        return 'destructive';
      case 'new':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // Get change icon
  const getChangeIcon = (status: string) => {
    switch (status) {
      case 'increased':
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case 'decreased':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  // Get change text color
  const getChangeTextColor = (status: string) => {
    switch (status) {
      case 'increased':
        return 'text-red-600';
      case 'decreased':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  // Format change text
  const formatChangeText = (change: number, percentage: number) => {
    const absChange = Math.abs(change);
    const absPercentage = Math.abs(percentage);
    const direction = change > 0 ? 'increased' : 'decreased';
    
    return `${direction} by ${absChange.toFixed(2)} (${absPercentage.toFixed(1)}%)`;
  };

  if (comparisonData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No matching markers found to compare between the selected tests.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparison</CardTitle>
        <p className="text-sm text-muted-foreground">
          Comparing results from {new Date(previousTest.date).toLocaleDateString()} to{' '}
          {new Date(currentTest.date).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {comparisonData.map((item) => (
            <div key={item.marker} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{getMarkerDisplayName(item.marker)}</h3>
                <Badge variant={getBadgeVariant(item.status)}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Previous</p>
                  <p>{formatValue(item.marker, item.previousValue)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current</p>
                  <div className="flex items-center gap-2">
                    <span>{formatValue(item.marker, item.currentValue)}</span>
                    {getChangeIcon(item.status)}
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                <p className={`text-sm ${getChangeTextColor(item.status)}`}>
                  {formatChangeText(item.change, item.changePercentage)}
                </p>
              </div>
              
              {/* Add interpretation here if available */}
              {item.interpretation && (
                <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                  <p>{item.interpretation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
