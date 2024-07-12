import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import React from 'react';

function page() {
  return (
    <PageHeader pageName="Settings">
      <Button variant="outline" size="sm">
        Feedback
      </Button>
    </PageHeader>
  );
}

export default page;
