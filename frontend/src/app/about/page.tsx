import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Longevity Coach',
  description: 'Learn about our mission to help you optimize your healthspan through personalized biomarker analysis and evidence-based longevity strategies.',
};

export default function AboutPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Optimizing healthspan through science
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            At Longevity Coach, we believe that living a longer, healthier life should be accessible to everyone. 
            Our platform combines cutting-edge research with personalized insights to help you optimize your biomarkers 
            and extend your healthspan.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Our Mission</h2>
          <p className="mt-6 text-gray-600">
            We&apos;re on a mission to empower individuals to take control of their health by providing actionable insights 
            based on their unique biomarker data. Our platform leverages the latest scientific research to help you make 
            informed decisions about your health and longevity.
          </p>

          <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Our Approach</h2>
          <p className="mt-6 text-gray-600">
            We combine advanced data analysis with evidence-based recommendations to help you understand your biomarkers 
            and what they mean for your long-term health. Our approach is rooted in the latest longevity research and 
            personalized to your unique biology.
          </p>

          <div className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Meet the Team</h2>
            <p className="mt-6 text-gray-600">
              Our team consists of experts in longevity research, data science, and health technology, all united by a 
              common goal: helping people live longer, healthier lives.
            </p>
            
            {/* Team members could be mapped from a data file in a real app */}
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10">
              {[
                {
                  name: 'Dr. Jane Smith',
                  role: 'Chief Medical Officer',
                  bio: 'Board-certified physician with a focus on preventive medicine and longevity.',
                },
                {
                  name: 'Alex Johnson',
                  role: 'Lead Data Scientist',
                  bio: 'Expert in machine learning and biomarker analysis with a PhD in Computational Biology.',
                },
              ].map((person) => (
                <div key={person.name} className="rounded-lg bg-gray-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                  <p className="text-indigo-600">{person.role}</p>
                  <p className="mt-2 text-gray-600">{person.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
