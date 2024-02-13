'use client';
import { newUrl } from '@/app/utils/actions';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useUrlContext } from '@/app/urlProvider';
import { useLocalStorage } from '@/app/utils/useLocalStorage';
import { IUrl } from './UrlList';

const NewUrlForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  ref.current?.reset();

  const { urls } = useUrlContext();
  const [localUrls, setLocalUrls] = urls;

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.length) {
      startTransition(async () => {
        const newEntry = await newUrl(e.target[0].value);
        const newUrls: IUrl[] = [...localUrls, newEntry];
        setLocalUrls(newUrls);
      });
    }
  };

  return (
    <>
      <form ref={ref} onSubmit={(e) => handleSubmit(e)} className="w-full">
        <div className="flex items-stretch py-2">
          <input
            className="appearance-none bg-gray-900 w-full mr-3 p-4 pl-6 text-white leading-tight border border-lime-400 focus:outline-none"
            type="text"
            name="fullUrl"
            placeholder="http://"
            aria-label="Full Url"
          />
          <button
            disabled={isPending}
            className="bg-lime-400 hover:bg-lime-500 text-gray-900 text-sm px-4 font-bold"
          >
            Jam
          </button>
        </div>
      </form>
    </>
  );
};

export default NewUrlForm;
