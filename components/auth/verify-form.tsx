'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SpinnerIcon } from '@/components/ui/icons';
import { useAuth } from '@/contexts';

export default function VerifyForm() {
  const { handleConfirmSignIn, isAuthenticating } = useAuth();
  const [code, setCode] = React.useState<string>('');

  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    handleConfirmSignIn(code);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className={cn('w-[400px] p-6')}>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Check your email
          </h1>
          <p className="text-muted-foreground text-sm">
            We have sent a temporary passcode. Please check your email and enter
            the passcode below.
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4 mt-8">
            <Label className="sr-only" htmlFor="code">
              code
            </Label>
            <Input
              id="code"
              placeholder="Enter code"
              type="number"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isAuthenticating}
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
          </div>
          <Button className="w-full" disabled={isAuthenticating}>
            {isAuthenticating && (
              <SpinnerIcon className="mr-2 h-5 w-5 animate-spin" />
            )}
            Continue with code
          </Button>
        </form>

        <p className="text-muted-foreground mt-10 px-8 text-center text-sm">
          <Link
            href="/signup"
            className="hover:text-primary  underline-offset-4"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
