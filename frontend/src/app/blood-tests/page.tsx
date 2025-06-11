import Link from 'next/link';

export default function BloodTestsPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Blood Test Analysis
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Track and analyze your blood test results over time.
          </p>
          <div className="mt-8">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <p className="text-indigo-700">
                This feature is coming soon. In the meantime, you can{' '}
                <Link href="/contact" className="font-medium text-indigo-600 hover:text-indigo-500">
                  contact us
                </Link>{' '}
                for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
