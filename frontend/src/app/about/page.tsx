import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Longevity Coach',
  description: 'Learn about our mission to help you optimize your healthspan through personalized biomarker analysis and evidence-based longevity strategies.',
};

const features = [
  {
    name: 'Personalized Insights',
    description: 'Tailored recommendations based on your unique biomarker profile',
    icon: CheckCircleIcon,
  },
  {
    name: 'Science-Backed',
    description: 'Recommendations based on the latest longevity research',
    icon: CheckCircleIcon,
  },
  {
    name: 'Actionable Data',
    description: 'Clear, easy-to-understand insights about your health',
    icon: CheckCircleIcon,
  },
];

const team = [
  {
    name: 'Dr. Jane Smith',
    role: 'Chief Medical Officer',
    imageUrl: '/team/jane-smith.jpg',
    bio: 'Board-certified physician with over 15 years of experience in preventive medicine and longevity research.',
  },
  {
    name: 'Alex Johnson',
    role: 'Head of Data Science',
    imageUrl: '/team/alex-johnson.jpg',
    bio: 'Expert in machine learning and biomarker analysis with a focus on health optimization.',
  },
  {
    name: 'Maria Garcia',
    role: 'Lead Nutritionist',
    imageUrl: '/team/maria-garcia.jpg',
    bio: 'Registered dietitian specializing in nutritional strategies for longevity and metabolic health.',
  },
  {
    name: 'David Kim',
    role: 'Product Lead',
    imageUrl: '/team/david-kim.jpg',
    bio: 'Product leader passionate about creating user-centric health technology solutions.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Optimizing healthspan through science
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At Longevity Coach, we believe that living a longer, healthier life should be accessible to everyone. 
              Our platform combines cutting-edge research with personalized insights to help you optimize your biomarkers 
              and extend your healthspan.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#contact"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#learn-more" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  src="/about-hero.jpg"
                  alt="Longevity Coach Dashboard"
                  width={2432}
                  height={1442}
                  className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div id="learn-more" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We&apos;re on a mission to empower individuals to take control of their health by providing actionable insights 
            based on their unique biomarker data. Our platform leverages the latest scientific research to help you make 
            informed decisions about your health and longevity.
          </p>
        </div>
        
        {/* Features */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We&apos;re a diverse group of experts in medicine, data science, and health technology, all united by a common 
              goal: helping people live longer, healthier lives.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
          >
            {team.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <div className="h-16 w-16 rounded-full bg-gray-50 overflow-hidden">
                    <Image
                      className="h-full w-full object-cover"
                      src={person.imageUrl}
                      alt=""
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{person.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
              <div className="w-full flex-auto">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ready to optimize your healthspan?</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  I&apos;m passionate about understanding how our bodies work at a fundamental level and using that knowledge to optimize health and longevity.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Join thousands of people who are taking control of their health with personalized longevity insights.
                </p>
                <div className="mt-10 flex">
                  <a
                    href="/signup"
                    className="text-sm font-semibold leading-6 text-indigo-600"
                  >
                    Get started <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
            <div
              className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
