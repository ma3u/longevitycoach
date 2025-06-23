'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import * as RadixDialog from '@radix-ui/react-dialog';
import { Activity, HeartPulse, Shield } from 'lucide-react';
import Link from 'next/link';
import { Fragment, useState } from 'react';

export default function StaticPage() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Overview', href: '#', current: true },
    { name: 'Features', href: '#features', current: false },
    { name: 'About', href: '#about', current: false },
  ];

  const features = [
    {
      name: 'Comprehensive Analysis',
      description: 'Detailed analysis of your health metrics with actionable insights.',
      icon: Activity,
    },
    {
      name: 'Personalized Plans',
      description: 'Custom health plans tailored to your unique biomarker profile.',
      icon: HeartPulse,
    },
    {
      name: 'Privacy First',
      description: 'Your health data is always secure and private.',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile menu */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
                <div className="absolute right-0 top-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex flex-shrink-0 items-center px-4">
                  <h1 className="text-xl font-bold text-gray-900">Longevity Coach</h1>
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`${
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        } group flex items-center rounded-md px-2 py-2 text-base font-medium`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-gray-900">Longevity Coach</h1>
            </div>
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1"></div>
            <div className="ml-4 flex items-center lg:ml-6">
              <RadixDialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <RadixDialog.Trigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Open Radix Dialog
                  </button>
                </RadixDialog.Trigger>
                <RadixDialog.Portal>
                  <RadixDialog.Overlay className="fixed inset-0 bg-black/30" />
                  <RadixDialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
                    <RadixDialog.Title className="text-lg font-medium text-gray-900">
                      Radix Dialog
                    </RadixDialog.Title>
                    <RadixDialog.Description className="mt-2 text-sm text-gray-500">
                      This is a Radix UI dialog component.
                    </RadixDialog.Description>
                    <div className="mt-4">
                      <RadixDialog.Close asChild>
                        <button
                          type="button"
                          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Close
                        </button>
                      </RadixDialog.Close>
                    </div>
                  </RadixDialog.Content>
                </RadixDialog.Portal>
              </RadixDialog.Root>
              <Link
                href="/signup"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Sign Up
              </Link>
              <button
                type="button"
                className="ml-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome to Longevity Coach</h1>
              <p className="mt-2 text-gray-600">
                Optimize your healthspan with personalized insights and recommendations.
              </p>

              {/* Features Section */}
              <div id="features" className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900">Features</h2>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature) => (
                    <div
                      key={feature.name}
                      className="rounded-lg border border-gray-200 p-6 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-100 text-indigo-600">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.name}</h3>
                      <p className="mt-2 text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* About Section */}
              <div id="about" className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900">About Us</h2>
                <div className="mt-6 space-y-6 text-gray-600">
                  <p>
                    Longevity Coach is dedicated to helping you understand and optimize your health
                    through comprehensive biomarker analysis and personalized recommendations.
                  </p>
                  <p>
                    Our platform combines the latest scientific research with user-friendly tools to
                    help you make informed decisions about your health and longevity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
