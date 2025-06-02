import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { bloodMarkers } from '../constants/bloodMarkers';

export default function BloodTestForm() {
  const { toast } = useToast();
  const [entryMethod, setEntryMethod] = useState<'manual' | 'upload'>('upload');
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (marker: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [marker]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Implement API call to save blood test
      console.log('Submitting blood test:', formValues);
      
      toast({
        title: 'Success',
        description: 'Blood test results saved successfully',
      });
      
      // Reset form
      setFormValues({});
    } catch (error) {
      console.error('Error saving blood test:', error);
      toast({
        title: 'Error',
        description: 'Failed to save blood test results',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs value={entryMethod} onValueChange={(v) => setEntryMethod(v as 'manual' | 'upload')} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="upload">Upload Results</TabsTrigger>
        <TabsTrigger value="manual">Manual Entry</TabsTrigger>
      </TabsList>
      
      <TabsContent value="upload" className="space-y-4">
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <p className="mb-4">Drag and drop your blood test results here or click to browse</p>
          <Button variant="outline">Select File</Button>
          <p className="text-sm text-muted-foreground mt-2">
            Supported formats: PDF, JPG, PNG (max 5MB)
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="manual">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(bloodMarkers).map(([key, marker]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>
                  {marker.name} ({marker.unit})
                </Label>
                <Input
                  id={key}
                  type="number"
                  step="0.01"
                  value={formValues[key] || ''}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  placeholder={`Enter ${marker.name.toLowerCase()} value`}
                />
                {marker.optimalRange && (
                  <p className="text-xs text-muted-foreground">
                    Optimal range: {marker.optimalRange}
                  </p>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Results'}
            </Button>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  );
}
