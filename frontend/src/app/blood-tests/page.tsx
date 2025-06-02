import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import BloodTestDashboard from '@/features/blood-tests/components/BloodTestDashboard';

export const dynamic = 'force-dynamic';

export default async function BloodTestsPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="container mx-auto py-8">
      <BloodTestDashboard />
    </div>
  );
}
