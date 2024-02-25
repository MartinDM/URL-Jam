'use client';
import { newUrl } from '@/app/utils/actions';
import { useRef, useState, useTransition } from 'react';
import { useUrlContext } from '@/app/urlProvider';
import { ValidInput, ValidUrl, hasProtocol } from '@/app/utils/validations';
import { z } from 'zod';
import normalizeUrl from 'normalize-url';

const NewUrlForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  ref.current?.reset();

  const { urls, generate } = useUrlContext();
  const [localUrls, setLocalUrls] = urls;
  const [generatedUrl, setGeneratedUrl] = generate;
  const [errors, setErrors] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setGeneratedUrl(null);
    let fullUrl = e.target[0].value.trim();

    const isValidInput = ValidInput.safeParse(fullUrl);
    if (!isValidInput.success) {
      setErrors(isValidInput.error.issues[0].message);
      return;
    }
    if (!hasProtocol(fullUrl)) {
      fullUrl = `https://${fullUrl}`;
    }
    const isValidUrl = ValidUrl.safeParse(fullUrl);
    if (isValidUrl.success) {
      fullUrl = normalizeUrl(fullUrl, {
        defaultProtocol: 'https',
      });
      const newEntry = await newUrl(fullUrl);
      const newUrls: ValidUrl[] = [...localUrls, newEntry];
      setLocalUrls(newUrls);
    } else {
      setErrors(isValidUrl.error.issues[0].message);
      return;
    }
  };

  return (
    <>
      <form
        ref={ref}
        onSubmit={(e) => handleSubmit(e)}
        className="max-auto md:w-full"
      >
        <div className="md:flex py-2">
          <input
            className="appearance-none mb-2 bg-gray-900 w-full mr-3 px-6 p-4 pl-6 md:mb-0 text-white leading-tight border border-lime-400 focus:outline-none"
            type="text"
            name="fullUrl"
            placeholder="http://"
            aria-label="Full Url"
          />
          <button
            disabled={isPending}
            className="bg-lime-400 hover:bg-lime-500 text-gray-900 text-md px-4 md:text-sm md:py-2 font-bold min-h-12 md:min-h-0"
          >
            Jam
          </button>
        </div>
        {errors && (
          <div className="pb-3">
            <p className="text-lime-500 ">{errors}</p>
          </div>
        )}
      </form>
    </>
  );
};

export default NewUrlForm;
