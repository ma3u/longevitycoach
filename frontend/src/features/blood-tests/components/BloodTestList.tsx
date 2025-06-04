import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface BloodTest {
  id: string;
  date: string;
  values: Record<string, number>;
}

interface BloodTestListProps {
  onTestSelect?: (testId: string) => void;
}

export function BloodTestList({ onTestSelect }: BloodTestListProps) {
  const { bloodTests, isLoading, deleteBloodTest } = useBloodTestContext();

  const handleRowClick = (testId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (onTestSelect) {
      onTestSelect(testId);
    }
  };

  const handleDelete = async (testId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this blood test? This action cannot be undone.')) {
      try {
        await deleteBloodTest(testId);
      } catch (error) {
        console.error('Failed to delete blood test:', error);
      }
    }
  };

  if (isLoading && bloodTests.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (bloodTests.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="mx-auto max-w-md py-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-muted-foreground"
              >
                <path d="M12 2v4" />
                <path d="m16.2 7.8 2.9-2.9" />
                <path d="M18 12h4" />
                <path d="m16.2 16.2 2.9 2.9" />
                <path d="M12 18v4" />
                <path d="m4.9 19.1 2.9-2.9" />
                <path d="M2 12h4" />
                <path d="M7.8 7.8 4.9 4.9" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium">No blood tests found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get started by adding your first blood test.
            </p>
            <Button className="mt-4" onClick={() => onTestSelect?.('new')}>
              Add Blood Test
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Markers</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bloodTests.map((test) => (
              <TableRow 
                key={test.id} 
                className="group cursor-pointer hover:bg-muted/50"
                onClick={(e) => handleRowClick(test.id, e)}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTest(null)}
              >
                Close
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(selectedTest.values).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
