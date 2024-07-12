'use client';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import React from 'react';

function Page() {
  return (
    <>
      <PageHeader pageName="">
        <Button variant="outline" size="sm">
          Feedback
        </Button>
      </PageHeader>
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-semibold">Hi, Welcome back</h3>
      </div>
    </>
  );
}

export default Page;
