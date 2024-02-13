import { IUrl } from '@/components/UrlList';
import { useEffect, useState } from 'react';

export const useLocalStorage = (defaultValue: IUrl[] = [], key: string) => {
  const [value, setValue] = useState(() => {
    const localStorageValue = window.localStorage.getItem(key);
    return localStorageValue?.length > 0
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
