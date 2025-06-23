'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { TextBlock } from '@/components/ui/TextBlock';
import { Timeline, TimelineCards } from '@/components/ui/Timeline';

interface JourneyItem {
  title: string;
  date: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

export default function JourneyPage() {
  const journeyItems: JourneyItem[] = [
    {
      title: 'The Beginning',
      date: '2020',
      description: 'Started exploring longevity research and biohacking',
      status: 'completed',
    },
    {
      title: 'First Experiments',
      date: '2021',
      description: 'Began tracking biomarkers and experimenting with different protocols',
      status: 'completed',
    },
    {
      title: 'Deep Dive',
      date: '2022',
      description: 'Invested in advanced testing and personalized interventions',
      status: 'completed',
    },
    {
      title: 'Current Focus',
      date: '2023-2024',
      description: 'Optimizing metabolic health and exploring cutting-edge longevity research',
      status: 'current',
    },
    {
      title: 'Future Goals',
      date: '2025+',
      description: 'Implementing advanced longevity strategies and contributing to research',
      status: 'upcoming',
    },
  ];

  const keyMilestones: JourneyItem[] = [
    {
      title: 'Metabolic Health',
      date: '2023 Q1',
      description: 'Achieved optimal glucose control and metabolic flexibility',
      status: 'completed',
    },
    {
      title: 'Sleep Optimization',
      date: '2023 Q2',
      description: 'Established consistent, high-quality sleep patterns',
      status: 'completed',
    },
    {
      title: 'Exercise Regimen',
      date: '2023 Q3',
      description: 'Developed a balanced exercise routine for longevity',
      status: 'current',
    },
    {
      title: 'Nutrition Strategy',
      date: '2023 Q4',
      description: 'Refining personalized nutrition for longevity',
      status: 'current',
    },
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            My Longevity Journey
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            I&apos;m documenting my personal journey to better health and longevity. Here&apos;s what I&apos;ve learned so far...
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:max-w-4xl">
          <Timeline items={journeyItems} className="mb-16" />
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-8">
              Key Milestones
            </h2>
            <TimelineCards 
              items={keyMilestones}
              className="max-w-3xl mx-auto"
              cardClassName="hover:shadow-lg transition-shadow duration-200"
            />
          </div>

          <div className="mt-16 text-center">
            <TextBlock className="mx-auto max-w-2xl">
              <p className="text-gray-600 mb-6">
                This timeline represents my personal journey in longevity research and biohacking. 
                I&apos;m continuously learning and refining my approach based on the latest scientific evidence.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Link href="/contact">
                  <Button variant="outline">
                    Get in Touch
                  </Button>
                </Link>
                <a 
                  href="https://www.linkedin.com/in/mbuchhorn/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </TextBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
