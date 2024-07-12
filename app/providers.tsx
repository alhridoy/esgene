'use client';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthProvider';
import { ThemeProvider } from '@/components/theme-provider';
import InitAmplify from '@/components/init-amplify';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <InitAmplify />
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
