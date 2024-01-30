'use client';
import Link from 'next/link';
import { GiCrossMark } from 'react-icons/gi';
import { useState, useEffect } from 'react';
import { deleteUrl } from '@/app/utils/actions';

const UrlList = ({ urls }) => {
  // const hasWindow = typeof window === 'object';
  // const [baseUrl, setBaseUrl] = useState<string | undefined>(
  //   hasWindow ? window.location.host : ''
  // );

  // useEffect(() => {
  //    setBaseUrl(window.location.origin);
  // }, []);

  if (!urls) return 'None yet';
  return urls.map((u) => {
    return (
      <div
        key={u.id}
        className={`px-8 py-2 border border-bottom cursor-pointer`}
      >
        <p>
          <GiCrossMark
            onClick={() => deleteUrl(u.id)}
            className="text-teal-200"
          />
          <Link target="blank" href={`/short/${u.shortUrl}`}>
            {`/short/${u.shortUrl}`}
          </Link>
        </p>
      </div>
    );
  });
};
export default UrlList;
