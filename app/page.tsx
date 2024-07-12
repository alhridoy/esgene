'use client';
import React from 'react';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { LandingPageAppBar } from '@/components/app-bar/landing-page-app-bar';

const FEATURES_DATA = [
  {
    title: 'Data Collection',
    description: 'Automated Collection: Streamlined, accurate data gathering',
  },
  {
    title: 'Emissions Calculation',
    description:
      'Accurrate calculation using our best AI models along with latest emission factors.',
  },
  {
    title: 'Insights & Recommendations',
    description:
      'Actionable insights and recommendations to reduce your carbon footprint.',
  },
];

export default function Page() {
  return (
    <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <LandingPageAppBar />
      <div className="flex min-h-screen w-full flex-col items-center justify-center py-20">
        <div className="z-10 w-full max-w-6xl px-5 xl:px-0">
          <h1
            className="animate-fade-up font-display opacity-1 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em]  drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
            style={{
              animationDelay: '0.15s',
              animationFillMode: 'forwards',
              maxWidth: '100%',
              wordWrap: 'break-word',
            }}
          >
            A sustainability report fact-checker for financial analysts &
            investors.
          </h1>
          <p className="opacity-1 mt-6 text-center text-gray-500 [text-wrap:balance] md:text-xl">
            We help businesses collect & understand their data <br /> to make
            informed decisions for a sustainable future.
          </p>
          <a
            href="https://b15jszr9yww.typeform.com/to/NUl55ZQo"
            target="_blank"
            rel="noreferrer"
            className="animate-fade-up bg-primary mx-auto mb-5 mt-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full px-7 py-2 transition-colors"
          >
            <p className="text-sm font-semibold text-white">
              Join the waitlist
            </p>
          </a>
          <div className="justify-content-between mt-5 flex w-full flex-col gap-2 md:flex-row">
            {FEATURES_DATA.map((feature, index) => (
              <Card key={index} className="mt-4 p-4 md:w-1/2">
                <CardTitle className="text-left">{feature.title}</CardTitle>
                <CardContent className="mt-2 p-0 text-gray-500">
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
