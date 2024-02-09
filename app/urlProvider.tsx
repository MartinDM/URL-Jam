'use client';
import db from '@/app/utils/db';
import { IUrl } from '@/components/UrlList';

import { createContext, useContext, useEffect, useState } from 'react';

const UrlContext = createContext([]);

export function useUrlContext() {
  return useContext(UrlContext);
}

export default function UrlProvider({ children }) {
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [shortUrls, setShortUrls] = useState<IUrl[]>([]);

  return (
    <UrlContext.Provider
      value={{
        generate: [generatedUrl, setGeneratedUrl],
      }}
    >
      {children}
    </UrlContext.Provider>
  );
}
