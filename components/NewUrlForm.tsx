'use client';
import { newUrl } from '@/app/utils/actions';
import { useState, useRef, useEffect } from 'react';

const NewUrlForm = ({}) => {
  const [url, setUrl] = useState('');
  const handleChange = (e) => setUrl(e.target.value);
  const ref = useRef<HTMLFormElement>(null);
  ref.current?.reset();

  return (
    <form ref={ref} action={newUrl} className="w-full max-w-sm">
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          name="fullUrl"
          placeholder="http://"
          aria-label="Full Url"
        />
        <button className="flex-shrink-0 bg-teal-500 uppercase hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
          Jam
        </button>
      </div>
    </form>
  );
};

export default NewUrlForm;
