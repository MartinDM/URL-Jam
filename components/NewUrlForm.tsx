'use client';
import { handleCopy, newUrl } from '@/app/utils/actions';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa6';
import db from '@/app/utils/db';
import { useUrlContext } from '@/app/urlProvider';

const NewUrlForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  ref.current?.reset();

  const { generate } = useUrlContext();
  const [generated, setGenerated] = generate;

  return (
    <>
      <form ref={ref} action={newUrl} className="w-full">
        <div className="flex items-stretch py-2">
          <input
            className="appearance-none bg-gray-900 w-full mr-3 p-4 pl-6 text-white leading-tight border border-lime-400 focus:outline-none"
            type="text"
            name="fullUrl"
            placeholder="http://"
            aria-label="Full Url"
          />
          <button className="bg-lime-400 hover:bg-lime-500 text-gray-900 text-sm px-4 font-bold">
            Jam
          </button>
        </div>
      </form>
    </>
  );
};

export default NewUrlForm;
