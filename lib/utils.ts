import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createServerRunner } from '@aws-amplify/adapter-nextjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CaretCoordinates {
  x: number;
  y: number;
}

export const saveToLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const loadFromLocalStorage = (key: string) => {
  return window.localStorage.getItem(key);
};

export function getCaretCoordinates(): CaretCoordinates {
  let x: number = 0;
  let y: number = 0;
  const selection = window.getSelection();

  if (selection && selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(false);

    const rect = range.getClientRects()[0];
    if (rect) {
      x = rect.left;
      y = rect.top;
    }
  }

  return { x, y };
}

export const amplifyConfigs = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID || '',
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID || '',
      region: process.env.NEXT_PUBLIC_AWS_REGION || '',
    },
  },
};

export const { runWithAmplifyServerContext } = createServerRunner({
  config: amplifyConfigs,
});
