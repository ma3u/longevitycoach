import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { BloodTest } from '../types';
import { formatValue, getMarkerDisplayName } from '../utils/formatBloodTest';

interface BloodTestTrendsProps {
  tests: BloodTest[];
  selectedMarkers: string[];
}

export function BloodTestTrends({ tests, selectedMarkers }: BloodTestTrendsProps) {
  // Sort tests by date
  const sortedTests = React.useMemo(() => {
    return [...tests].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [tests]);

  // Format data for the chart
  const chartData = React.useMemo(() => {
    return sortedTests.map((test) => {
      const dataPoint: any = {
        date: format(new Date(test.date), 'MMM d, yyyy'),
        fullDate: test.date,
      };

      selectedMarkers.forEach((marker) => {
        if (test.values[marker] !== undefined) {
          dataPoint[marker] = test.values[marker];
        }
      });

      return dataPoint;
    });
  }, [sortedTests, selectedMarkers]);

  // Generate colors for the lines
  const lineColors = [
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#14b8a6', // teal-500
    '#f97316', // orange-500
    '#6366f1', // indigo-500
  ];

  if (tests.length < 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            At least two blood tests are needed to show trends over time.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tickFormatter={(value) => value.toLocaleString()}
                tick={{ fontSize: 12 }}
                tickMargin={10}
                width={60}
              />
              <Tooltip 
                formatter={(value: any, name: any) => {
                  const marker = selectedMarkers.find(m => m === name);
                  const markerInfo = marker ? bloodMarkers[marker as keyof typeof bloodMarkers] : null;
                  return [
                    formatValue(marker || '', value as number),
                    markerInfo?.name || name,
                  ];
                }}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend 
                formatter={(value) => {
                  const marker = selectedMarkers.find(m => m === value);
                  return marker ? getMarkerDisplayName(marker) : value;
                }}
              />
              {selectedMarkers.map((marker, index) => (
                <Line
                  key={marker}
                  type="monotone"
                  dataKey={marker}
                  stroke={lineColors[index % lineColors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name={marker}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// This is a simplified version of the blood markers for the trends component
// In a real app, this would be imported from the constants file
const bloodMarkers: Record<string, { name: string; unit: string }> = {
  vitaminD: { name: 'Vitamin D', unit: 'ng/mL' },
  ferritin: { name: 'Ferritin', unit: 'ng/mL' },
  crp: { name: 'C-Reactive Protein', unit: 'mg/L' },
  hba1c: { name: 'Hemoglobin A1c', unit: '%' },
  tsh: { name: 'TSH', unit: 'mIU/L' },
  freeT3: { name: 'Free T3', unit: 'pg/mL' },
  freeT4: { name: 'Free T4', unit: 'ng/dL' },
  b12: { name: 'Vitamin B12', unit: 'pg/mL' },
  folate: { name: 'Folate', unit: 'ng/mL' },
  magnesium: { name: 'Magnesium', unit: 'mg/dL' },
};
