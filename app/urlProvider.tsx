'use client';
import { IUrl } from '@/components/UrlList';

import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from './utils/useLocalStorage';

const UrlContext = createContext([]);

export function useUrlContext() {
  return useContext(UrlContext);
}

export default function UrlProvider({ children }) {
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [localUrls, setLocalUrls] = useLocalStorage([], 'urls');

  const [topUrl, setTopUrl] = useState<IUrl | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    let baseUrl: string;

    if (typeof window !== 'undefined') {
      // Your client-side code that uses
      baseUrl = `${window.location.href}short/`;
    } else {
      baseUrl = './short';
    }

    if (localUrls.length > 0) {
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
    // urls is localstorage
  }, [localUrls]);

  return (
    <UrlContext.Provider
      value={{
        generate: [generatedUrl, setGeneratedUrl],
        copy: [isCopied, setIsCopied],
        urls: [localUrls, setLocalUrls],
      }}
    >
      {children}
    </UrlContext.Provider>
  );
}
