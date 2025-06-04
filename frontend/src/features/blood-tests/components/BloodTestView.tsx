import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { BloodTest, BloodTestAnalysis } from '../types';
import { formatValue, getMarkerDisplayName, groupMarkersByCategory, sortMarkers } from '../utils/formatBloodTest';

interface BloodTestViewProps {
  test: BloodTest;
  analysis: BloodTestAnalysis | null;
}

export function BloodTestView({ test, analysis }: BloodTestViewProps) {
  const { date, notes, values } = test;
  
  // Group and sort markers by category
  const groupedMarkers = React.useMemo(() => {
    const markers = Object.keys(values);
    const sortedMarkers = sortMarkers(markers);
    return groupMarkersByCategory(sortedMarkers);
  }, [values]);
  
  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-100 text-green-800';
      case 'deficient':
      case 'elevated':
        return 'bg-yellow-100 text-yellow-800';
      case 'suboptimal':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Find result for a marker
  const getMarkerResult = (marker: string) => {
    if (!analysis) return null;
    return analysis.results.find(r => r.marker === marker) || null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Blood Test Results</h2>
          <p className="text-muted-foreground">
            {format(new Date(date), 'MMMM d, yyyy')}
          </p>
        </div>
        {analysis && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Overall Status:</span>
            <Badge
              className={getStatusBadge(analysis.overallStatus)}
              variant="outline"
            >
              {analysis.overallStatus.charAt(0).toUpperCase() + analysis.overallStatus.slice(1)}
            </Badge>
          </div>
        )}
      </div>
      
      {notes && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{notes}</p>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-6">
        {Object.entries(groupedMarkers).map(([category, markers]) => (
          <Card key={category}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {markers.map((marker) => {
                  const result = getMarkerResult(marker);
                  const value = values[marker];
                  
                  return (
                    <div key={marker} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex-1">
                        <div className="font-medium">{getMarkerDisplayName(marker)}</div>
                        {result?.description && (
                          <p className="text-sm text-muted-foreground">
                            {result.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">
                            {formatValue(marker, value)}
                          </div>
                          {result?.optimalRange && (
                            <div className="text-xs text-muted-foreground">
                              Optimal: {result.optimalRange}
                            </div>
                          )}
                        </div>
                        {result?.status && (
                          <Badge 
                            className={`${getStatusBadge(result.status)} min-w-[80px] justify-center`}
                            variant="outline"
                          >
                            {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {analysis?.recommendations && analysis.recommendations.length > 0 && (
        <Card className="border-l-4 border-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              {analysis.recommendations.map((rec, i) => (
                <li key={i} className="text-muted-foreground">
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
