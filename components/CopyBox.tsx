'use client';
import { useUrlContext } from '@/app/urlProvider';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa6';

const CopyBox = () => {
  const { generate } = useUrlContext();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [generatedUrl, setGeneratedUrl] = generate;

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  if (!generatedUrl) return;
  return (
    <>
      <div className="p-4 text-white bg-gradient-to-b from-gray-900 from-10% to-gray-800 to-90% border border-gray-600 rounded-md border-1">
        <p className='text-white'>Your URL 🚀</p>
        <div className='flex'>
          <Link href={generatedUrl} className="font-bold underline hover:text-lime-400">
            {generatedUrl}
          </Link>
          <div className="ml-auto text-sm">
            {isCopied ? (
              'Copied!'
            ) : (
              <FaRegCopy
                className="cursor-pointer text-xl hover:text-lime-400 transition-colors"
                onClick={(e) => handleCopy(generatedUrl)}
              />
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default CopyBox;
