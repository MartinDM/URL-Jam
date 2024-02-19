'use client';
import { useEffect, useState } from 'react';
import { ValidEntry } from './validations';

export const useLocalStorage = (
  defaultValue: ValidEntry[] | null,
  key: string
) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const localStorageValue = window.localStorage.getItem(key);
      return localStorageValue?.length > 0
        ? JSON.parse(localStorageValue)
        : defaultValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
