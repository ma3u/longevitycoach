import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BloodTestSummary } from './BloodTestSummary';
import { BloodTestView } from './BloodTestView';
import { BloodTestTrends } from './BloodTestTrends';
import { BloodTestComparison } from './BloodTestComparison';
import { BloodTest, BloodTestAnalysis } from '../types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useBloodTestContext } from '../context/BloodTestContext';

export function BloodTestAnalysisDashboard() {
  const { selectedTest, analysis, bloodTests } = useBloodTestContext();
  const [selectedMarkers, setSelectedMarkers] = useState<string[]>([]);
  const [showMarkerSelector, setShowMarkerSelector] = useState(false);
  const [comparisonTest, setComparisonTest] = useState<BloodTest | null>(null);
  const [showTestSelector, setShowTestSelector] = useState(false);

  // Get unique markers from all tests
  const allMarkers = React.useMemo(() => {
    const markers = new Set<string>();
    bloodTests.forEach(test => {
      Object.keys(test.values).forEach(marker => markers.add(marker));
    });
    return Array.from(markers);
  }, [bloodTests]);

  // Toggle marker selection
  const toggleMarker = (marker: string) => {
    setSelectedMarkers(prev => 
      prev.includes(marker)
        ? prev.filter(m => m !== marker)
        : [...prev, marker]
    );
  };

  // Select all markers
  const selectAllMarkers = () => {
    setSelectedMarkers(allMarkers);
  };

  // Clear all markers
  const clearAllMarkers = () => {
    setSelectedMarkers([]);
  };

  if (!selectedTest) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No test selected</h3>
        <p className="text-muted-foreground">
          Select a blood test from the list to view analysis
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {analysis && (
        <>
          <BloodTestSummary analysis={analysis} />
          
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <BloodTestView test={selectedTest} analysis={analysis} />
            </TabsContent>
            
            <TabsContent value="trends" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Biomarker Trends</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowMarkerSelector(true)}
                  >
                    {selectedMarkers.length > 0 
                      ? `${selectedMarkers.length} selected` 
                      : 'Select Markers'}
                  </Button>
                </div>
                
                {selectedMarkers.length > 0 ? (
                  <BloodTestTrends 
                    tests={bloodTests} 
                    selectedMarkers={selectedMarkers} 
                  />
                ) : (
                  <div className="text-center py-12 border rounded-lg">
                    <p className="text-muted-foreground">
                      Select markers to view trends over time
                    </p>
                    <Button 
                      variant="link" 
                      className="mt-2"
                      onClick={() => setShowMarkerSelector(true)}
                    >
                      Select Markers
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="compare" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Compare Tests</h3>
                  {comparisonTest ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowTestSelector(true)}
                    >
                      Change Comparison
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowTestSelector(true)}
                    >
                      Select Test to Compare
                    </Button>
                  )}
                </div>
                
                {comparisonTest ? (
                  <BloodTestComparison 
                    currentTest={selectedTest}
                    previousTest={comparisonTest}
                    markers={Object.keys(selectedTest.values).filter(
                      marker => comparisonTest.values[marker] !== undefined
                    )}
                  />
                ) : (
                  <div className="text-center py-12 border rounded-lg">
                    <p className="text-muted-foreground">
                      Select a previous test to compare with the current results
                    </p>
                    <Button 
                      variant="link" 
                      className="mt-2"
                      onClick={() => setShowTestSelector(true)}
                    >
                      Select Test
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
      
      {/* Marker Selection Dialog */}
      <Dialog open={showMarkerSelector} onOpenChange={setShowMarkerSelector}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Markers to Track</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between">
              <Button 
                variant="link" 
                size="sm" 
                className="h-auto p-0"
                onClick={selectAllMarkers}
              >
                Select All
              </Button>
              <Button 
                variant="link" 
                size="sm" 
                className="h-auto p-0"
                onClick={clearAllMarkers}
              >
                Clear All
              </Button>
            </div>
            <div className="max-h-[400px] overflow-y-auto space-y-2">
              {allMarkers.map(marker => (
                <div 
                  key={marker} 
                  className={`p-2 rounded cursor-pointer hover:bg-muted/50 ${
                    selectedMarkers.includes(marker) ? 'bg-muted' : ''
                  }`}
                  onClick={() => toggleMarker(marker)}
                >
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={selectedMarkers.includes(marker)} 
                      onChange={() => {}}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span>{marker}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setShowMarkerSelector(false)}>
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Test Selection Dialog */}
      <Dialog open={showTestSelector} onOpenChange={setShowTestSelector}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Test to Compare</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {bloodTests
              .filter(test => test.id !== selectedTest.id)
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(test => (
                <div 
                  key={test.id}
                  className={`p-3 rounded border cursor-pointer hover:bg-muted/50 ${
                    comparisonTest?.id === test.id ? 'border-primary bg-muted' : 'border-border'
                  }`}
                  onClick={() => {
                    setComparisonTest(test);
                    setShowTestSelector(false);
                  }}
                >
                  <div className="font-medium">
                    {new Date(test.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Object.keys(test.values).length} markers
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-end pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowTestSelector(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
