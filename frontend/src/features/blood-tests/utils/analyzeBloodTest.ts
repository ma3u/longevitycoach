import { bloodMarkers } from '../constants/bloodMarkers';
import { BloodTestResult, BloodTestAnalysis } from '../types';

export function analyzeBloodTest(values: Record<string, number>): BloodTestAnalysis {
  const results: BloodTestResult[] = [];
  const recommendations: Set<string> = new Set();
  const priorityAreas: Record<string, { category: string; markers: string[]; severity: 'high' | 'medium' | 'low' }> = {
    inflammation: { category: 'Inflammation', markers: [], severity: 'low' },
    nutrients: { category: 'Nutrient Deficiencies', markers: [], severity: 'low' },
    metabolic: { category: 'Metabolic Health', markers: [], severity: 'low' },
  };

  // Analyze each marker
  Object.entries(values).forEach(([marker, value]) => {
    const markerInfo = bloodMarkers[marker as keyof typeof bloodMarkers];
    if (!markerInfo) return;

    let status: BloodTestResult['status'] = 'optimal';
    let markerRecommendations: string[] = [];
    
    // Simple analysis - in a real app, this would be more sophisticated
    if (markerInfo.optimalRange) {
      const [min, max] = markerInfo.optimalRange
        .split('-')
        .map(s => parseFloat(s.replace(/[^0-9.]/g, '')));
      
      if (value < min) {
        status = 'deficient';
        markerRecommendations.push(`Consider increasing ${markerInfo.name} through diet or supplementation.`);
      } else if (value > max) {
        status = 'elevated';
        markerRecommendations.push(`${markerInfo.name} is above optimal range.`);
      }
    }

    // Add to priority areas if not optimal
    if (status !== 'optimal') {
      if (marker.includes('crp') || marker.includes('hsCRP')) {
        priorityAreas.inflammation.markers.push(marker);
        priorityAreas.inflammation.severity = 'high';
      } else if (marker.startsWith('vitamin') || marker === 'ferritin' || marker === 'b12' || marker === 'folate') {
        priorityAreas.nutrients.markers.push(marker);
        priorityAreas.nutrients.severity = status === 'deficient' ? 'high' : 'medium';
      } else if (marker.includes('glucose') || marker.includes('insulin') || marker === 'hba1c') {
        priorityAreas.metabolic.markers.push(marker);
        priorityAreas.metabolic.severity = 'medium';
      }
    }

    markerRecommendations.forEach(rec => recommendations.add(rec));

    results.push({
      marker,
      value,
      unit: markerInfo.unit,
      status,
      optimalRange: markerInfo.optimalRange || 'N/A',
      description: markerInfo.description || '',
      recommendations: markerRecommendations,
    });
  });

  // Calculate overall status
  const hasHighPriority = Object.values(priorityAreas).some(area => area.severity === 'high');
  const hasMediumPriority = Object.values(priorityAreas).some(area => area.severity === 'medium');
  
  let overallStatus: 'excellent' | 'good' | 'fair' | 'poor' = 'excellent';
  if (hasHighPriority) {
    overallStatus = 'poor';
  } else if (hasMediumPriority) {
    overallStatus = 'fair';
  } else if (results.some(r => r.status !== 'optimal')) {
    overallStatus = 'good';
  }

  return {
    testId: Date.now().toString(),
    testDate: new Date().toISOString(),
    overallStatus,
    results,
    summary: generateSummary(overallStatus, priorityAreas),
    recommendations: Array.from(recommendations),
    priorityAreas: Object.values(priorityAreas).filter(area => area.markers.length > 0),
  };
}

function generateSummary(
  status: 'excellent' | 'good' | 'fair' | 'poor',
  priorityAreas: Record<string, { category: string; markers: string[]; severity: string }>
): string {
  const activeAreas = Object.values(priorityAreas).filter(area => area.markers.length > 0);
  
  if (status === 'excellent') {
    return 'All your biomarkers are within optimal ranges. Keep up the good work!';
  }
  
  const areas = activeAreas.map(area => area.category.toLowerCase()).join(', ');
  
  if (status === 'good') {
    return `Your results look good overall, with minor areas for improvement in ${areas}.`;
  } else if (status === 'fair') {
    return `Your results show some areas that need attention, particularly in ${areas}.`;
  } else {
    return `Your results indicate several areas that need attention, especially in ${areas}.`;
  }
}
