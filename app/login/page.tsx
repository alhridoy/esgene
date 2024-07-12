'use client';

import * as React from 'react';
import { useAuth } from '@/contexts';

import VerifyForm from '@/components/auth/verify-form';
import LoginForm from '@/components/auth/login-form';

export default function SignUp() {
  const { proceedToVerify, isUserAuthenticated } = useAuth();
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuth = await isUserAuthenticated();

        if (isAuth) {
          window.location.href = '/dashboard';
        }
      } catch (error) {
        // Handle errors if needed
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [isUserAuthenticated]);
  return (
    <div>
      {isLoading ? (
        // Render a loader or loading indicator here
        <div>Loading...</div>
      ) : (
        // Render the appropriate form based on proceedToVerify
        <div>{proceedToVerify ? <VerifyForm /> : <LoginForm />}</div>
      )}
    </div>
  );
}
