import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { BloodTestAnalysis } from '../types';

interface BloodTestSummaryProps {
  analysis: BloodTestAnalysis;
}

export function BloodTestSummary({ analysis }: BloodTestSummaryProps) {
  const { overallStatus, summary, priorityAreas } = analysis;
  
  // Get status icon and color
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'excellent':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
        };
      case 'good':
        return {
          icon: <Info className="h-5 w-5 text-blue-500" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
        };
      case 'fair':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
        };
      case 'poor':
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
        };
      default:
        return {
          icon: <Info className="h-5 w-5 text-gray-500" />,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
        };
    }
  };
  
  const statusConfig = getStatusConfig(overallStatus);
  
  return (
    <div className="space-y-6">
      <Card className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-l-4`}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            {statusConfig.icon}
            <CardTitle className={`text-lg ${statusConfig.textColor}`}>
              {overallStatus.charAt(0).toUpperCase() + overallStatus.slice(1)} Health Status
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{summary}</p>
        </CardContent>
      </Card>
      
      {priorityAreas.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Priority Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priorityAreas.map((area, index) => {
                const getSeverityConfig = (severity: string) => {
                  switch (severity) {
                    case 'high':
                      return {
                        bgColor: 'bg-red-50',
                        textColor: 'text-red-800',
                        borderColor: 'border-red-200',
                      };
                    case 'medium':
                      return {
                        bgColor: 'bg-yellow-50',
                        textColor: 'text-yellow-800',
                        borderColor: 'border-yellow-200',
                      };
                    case 'low':
                    default:
                      return {
                        bgColor: 'bg-blue-50',
                        textColor: 'text-blue-800',
                        borderColor: 'border-blue-200',
                      };
                  }
                };
                
                const severityConfig = getSeverityConfig(area.severity);
                
                return (
                  <div 
                    key={index}
                    className={`${severityConfig.bgColor} ${severityConfig.borderColor} border-l-4 p-4 rounded`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${severityConfig.textColor}`}>
                        {area.category}
                      </h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${severityConfig.bgColor} ${severityConfig.textColor} border ${severityConfig.borderColor}`}>
                        {area.severity.charAt(0).toUpperCase() + area.severity.slice(1)} Priority
                      </span>
                    </div>
                    {area.markers.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {area.markers.map((marker, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800 border border-gray-200"
                          >
                            {marker}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
