import { bloodMarkers } from '../constants/bloodMarkers';

/**
 * Formats a blood test value with its unit
 */
export function formatValue(
  marker: string,
  value: number | string | null | undefined
): string {
  if (value === null || value === undefined) return 'N/A';
  
  const markerInfo = bloodMarkers[marker as keyof typeof bloodMarkers];
  const unit = markerInfo?.unit || '';
  
  // Format numbers with 2 decimal places if they have decimals
  if (typeof value === 'number') {
    return Number.isInteger(value) 
      ? `${value} ${unit}`
      : `${value.toFixed(2)} ${unit}`;
  }
  
  return `${value} ${unit}`;
}

/**
 * Gets the display name for a blood marker
 */
export function getMarkerDisplayName(marker: string): string {
  return bloodMarkers[marker as keyof typeof bloodMarkers]?.name || marker;
}

/**
 * Gets the category for a blood marker
 */
export function getMarkerCategory(marker: string): string {
  // This is a simplified version - you might want to expand this
  // with a more comprehensive categorization
  if (marker.includes('vitamin') || marker === 'b12' || marker === 'folate') {
    return 'Vitamins';
  }
  if (marker.includes('cholesterol') || marker === 'triglycerides' || marker === 'hdl' || marker === 'ldl') {
    return 'Lipids';
  }
  if (marker.includes('glucose') || marker === 'hba1c' || marker === 'insulin') {
    return 'Blood Sugar';
  }
  if (marker.includes('crp') || marker.includes('homocysteine')) {
    return 'Inflammation';
  }
  if (marker.includes('t3') || marker.includes('t4') || marker === 'tsh') {
    return 'Thyroid';
  }
  return 'Other';
}

/**
 * Groups markers by category for better organization in the UI
 */
export function groupMarkersByCategory(markers: string[]): Record<string, string[]> {
  return markers.reduce((acc, marker) => {
    const category = getMarkerCategory(marker);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(marker);
    return acc;
  }, {} as Record<string, string[]>);
}

/**
 * Sorts markers by category and then alphabetically
 */
export function sortMarkers(markers: string[]): string[] {
  return [...markers].sort((a, b) => {
    const categoryA = getMarkerCategory(a);
    const categoryB = getMarkerCategory(b);
    
    if (categoryA !== categoryB) {
      return categoryA.localeCompare(categoryB);
    }
    
    return getMarkerDisplayName(a).localeCompare(getMarkerDisplayName(b));
  });
}
