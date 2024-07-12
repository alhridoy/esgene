// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import {
  signIn,
  confirmSignIn,
  fetchUserAttributes,
  signOut,
  signUp,
  getCurrentUser,
  FetchUserAttributesOutput,
  autoSignIn,
} from 'aws-amplify/auth';
import { toast } from 'sonner';
import { saveToLocalStorage, loadFromLocalStorage } from '@/lib/utils';

export interface AuthContextType {
  user: FetchUserAttributesOutput | undefined;
  /**
   * Whether the user is currently being authenticated
   */
  isAuthenticating: boolean;
  /**
   * Checks if user is authenticated
   */
  isUserAuthenticated: () => boolean | Promise<boolean>;
  /**
   * Whether to proceed to the verify auth screen.
   */
  proceedToVerify: boolean;
  /**
   * Sign up user.
   */
  handleSignUp: (email: string, fullName: string) => void;
  /**
   * Sign in with email
   */
  handleSignIn: (email: string) => void;
  /**
   * Confirm sign in with code
   */
  handleConfirmSignIn: (code: string) => void;
  /**
   * Sign out
   */
  handleSignOut: () => void;
}

const AUTH_FLOW_TYPE = 'CUSTOM_WITHOUT_SRP';

export const AuthContextV2 = createContext<AuthContextType>({
  user: undefined,
  isAuthenticating: false,
  isUserAuthenticated: () => false,
  handleSignUp: () => {},
  handleSignIn: () => {},
  handleConfirmSignIn: () => {},
  handleSignOut: () => {},
  proceedToVerify: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FetchUserAttributesOutput | undefined>(
    undefined,
  );
  const [isAuthenticating, setAuthenticating] = useState<boolean>(false);
  const [proceedToVerify, setProceedToVerify] = useState<boolean>(false);

  const handleSignIn = async (email: string) => {
    try {
      setAuthenticating(true);

      const {
        nextStep: { signInStep },
      } = await signIn({
        username: email,
        options: {
          authFlowType: AUTH_FLOW_TYPE,
        },
      });

      // Proceed to verification if custom challenge is required
      if (signInStep === 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE') {
        setProceedToVerify(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setAuthenticating(false);
    }
  };

  const handleConfirmSignIn = async (code: string) => {
    try {
      setAuthenticating(true);

      const {
        nextStep: { signInStep },
      } = await confirmSignIn({ challengeResponse: code });

      // Redirect to dashboard if sign in is done
      if (signInStep === 'DONE') {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Error confirming sign in', error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setAuthenticating(false);
    }
  };

  const getCurrentUserAttributes = async (): Promise<
    FetchUserAttributesOutput | undefined
  > => {
    try {
      const user = await fetchUserAttributes();
      saveToLocalStorage(user.sub!, JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error getting current user', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleSignUp = async (email: string, fullName: string) => {
    try {
      setAuthenticating(true);

      const {
        nextStep: { signUpStep },
      } = await signUp({
        username: email,
        password: 'password', // Password is required but not used
        options: {
          userAttributes: {
            email,
            given_name: fullName.split(' ')[0],
            family_name: fullName.split(' ')[1],
          },
          autoSignIn: {
            authFlowType: AUTH_FLOW_TYPE,
          },
        },
      });

      if (signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
        autoSignIn();
        setProceedToVerify(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setAuthenticating(false);
    }
  };

  const isUserAuthenticated = async (): Promise<boolean> => {
    const currentUser = await getCurrentUser();

    return !!currentUser; // Returns true if currentUser is truthy, false otherwise
  };

  React.useEffect(() => {
    const handleGetCurrentUserAttributes = async () => {
      const currentUser = await getCurrentUserAttributes();

      // If no current user, return
      if (!currentUser) return;

      // If current user exists, set the user state
      const userAttributes = loadFromLocalStorage(currentUser.sub!);
      setUser(JSON.parse(userAttributes!));
    };

    handleGetCurrentUserAttributes();
  }, [isAuthenticating]);

  return (
    <AuthContextV2.Provider
      value={{
        user,
        isAuthenticating,
        isUserAuthenticated,
        handleSignUp,
        handleSignOut,
        handleSignIn,
        proceedToVerify,
        handleConfirmSignIn,
      }}
    >
      {children}
    </AuthContextV2.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContextV2);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
