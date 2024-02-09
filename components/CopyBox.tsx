'use client';
import { useUrlContext } from '@/app/urlProvider';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa6';

const CopyBox = () => {
  const { generate } = useUrlContext();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [generatedUrl] = generate;

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  if (!generatedUrl) return;
  return (
    <div className="text-grey-90 bg-lime-400 p-4 flex">
      {generatedUrl && (
        <Link href={generatedUrl} className="underline font-bold">
          {generatedUrl}
        </Link>
      )}
      <div className="ml-auto text-sm">
        {isCopied ? (
          'Copied!'
        ) : (
          <FaRegCopy
            className="cursor-pointer text-xl hover:text-white transition-colors"
            onClick={(e) => handleCopy(generatedUrl)}
          />
        )}
      </div>
    </div>
  );
};

export default CopyBox;
