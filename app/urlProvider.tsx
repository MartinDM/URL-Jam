'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from './utils/useLocalStorage';
import { ValidEntry } from './utils/validations';

const UrlContext = createContext([]);

export function useUrlContext() {
  return useContext(UrlContext);
}

export default function UrlProvider({ children }) {
  const [localUrls, setLocalUrls] = useLocalStorage([], 'urls');
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [topUrl, setTopUrl] = useState<ValidEntry | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let baseUrl: string;

    if (typeof window !== 'undefined') {
      baseUrl = `${window.location.href}short/`;
    } else {
      baseUrl = './short';
    }

    if (localUrls?.length > 0) {
      const newestUrl = localUrls?.reduce((prev, current) =>
        prev && prev.id > current.id ? prev : current
      );
      setTopUrl(newestUrl);
      if (topUrl && topUrl.id < newestUrl.id) {
        setTopUrl(newestUrl);
        setGeneratedUrl(`${baseUrl + newestUrl.shortUrl}`);
      } else {
        setGeneratedUrl(null);
      }
    }
  }, [localUrls]);

  return (
    <UrlContext.Provider
      value={{
        generate: [generatedUrl, setGeneratedUrl],
        copy: [isCopied, setIsCopied],
        loading: [isLoading, setIsLoading],
        urls: [localUrls, setLocalUrls],
      }}
    >
      {children}
    </UrlContext.Provider>
  );
}
