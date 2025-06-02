import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, List, BarChart, FileText } from 'lucide-react';
import { BloodTestList } from './BloodTestList';
import { BloodTestForm } from './BloodTestForm';
import { BloodTestAnalysisDashboard } from './BloodTestAnalysisDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BloodTestProvider } from '../context/BloodTestContext';

export function BloodTestDashboard() {
  const [activeTab, setActiveTab] = useState('list');
  const [showForm, setShowForm] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

  const handleTestSelect = (testId: string) => {
    setSelectedTestId(testId);
    setActiveTab('analysis');
  };

  const handleNewTestSuccess = () => {
    setShowForm(false);
    setActiveTab('list');
  };

  return (
    <BloodTestProvider>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Blood Test Analysis</h1>
            <p className="text-muted-foreground">
              Track and analyze your blood test results over time
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Blood Test
          </Button>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">All Tests</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              className="flex items-center gap-2"
              disabled={!selectedTestId}
            >
              <BarChart className="h-4 w-4" />
              <span className="hidden sm:inline">Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2" disabled>
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Your Blood Tests</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      View and manage your blood test history
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowForm(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Test
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <BloodTestList onTestSelect={handleTestSelect} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="mt-6">
            {selectedTestId ? (
              <BloodTestAnalysisDashboard />
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto max-w-md py-12">
                    <BarChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No test selected</h3>
                    <p className="text-muted-foreground mb-4">
                      Select a blood test from the list to view detailed analysis
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('list')}
                    >
                      View All Tests
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Generate and download detailed reports (Coming Soon)
                </p>
              </CardHeader>
              <CardContent className="min-h-[400px] flex items-center justify-center">
                <div className="text-center max-w-md">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Reports Feature Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're working on adding the ability to generate and download detailed reports of your blood test history.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <BloodTestForm 
          open={showForm} 
          onOpenChange={setShowForm} 
          onSuccess={handleNewTestSuccess} 
        />
      </div>
    </BloodTestProvider>
  );
}
