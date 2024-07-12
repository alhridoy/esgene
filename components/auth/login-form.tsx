'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { GoogleIcon, SpinnerIcon } from '@/components/ui/icons';
import { useAuth } from '@/contexts';

export default function LoginForm() {
  const { handleSignIn, isAuthenticating } = useAuth();
  const [email, setEmail] = React.useState<string>('');

  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    handleSignIn(email);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className={cn('w-[400px] p-6')}>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your email below to log in
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4 mt-8">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isAuthenticating}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <Button className="w-full" disabled={isAuthenticating}>
            {isAuthenticating && (
              <SpinnerIcon className="mr-2 h-5 w-5 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </form>
        <div className="relative mb-4 mt-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          className="w-full"
          variant="outline"
          type="button"
          disabled={isAuthenticating}
        >
          <GoogleIcon className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
    </div>
  );
}
