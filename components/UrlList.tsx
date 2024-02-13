'use client';
import Link from 'next/link';
import { GiCrossMark } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import { useUrlContext } from '@/app/urlProvider';
import { useTransition } from 'react';
import { FaRegCopy } from 'react-icons/fa6';

export interface IUrl {
  id: string;
  shortUrl: string;
  fullUrl: string;
}

const UrlList = () => {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { generate, urls } = useUrlContext();
  const [generatedUrl, setGeneratedUrl] = generate;
  const [localUrls, setLocalUrls] = urls;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let baseUrl: string;
  if (typeof window !== 'undefined') {
    baseUrl = `${window.location.origin}/short/`;
  }

  const handleCopy = async (e: MouseEvent, url: string) => {
    const shortUrl = `${baseUrl + url}`;
    await navigator.clipboard.writeText(shortUrl);
  };

  const handleDeleteLocal = (id: string) => {
    const newUrls = localUrls.filter((u) => u.id !== id);
    startTransition(() => {
      setLocalUrls(newUrls);
    });
  };

  return (
    <table className="p-4 mx-auto justify-items-stretch min-w-[60%]">
      <thead className={'text-left'}>
        <tr>
          <th>
            <h3 className="mx-auto text-bold text-lime-400 text-lg">
              {!!localUrls?.length && 'Your URLs'}
            </h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {localUrls?.map((u: IUrl) => (
          <tr
            key={u.id}
            className={`flex content-between gap-5 items-center border-b border-b-slate-700 ${
              isPending ? 'opacity-30' : ''
            }`}
          >
            <td className="flex py-3 pr-8">
              <FaRegCopy
                title="Copy short Url"
                className="cursor-pointer text-xl text-lime-400 mr-4 hover:text-lime-200 transition-colors"
                onClick={(e) => handleCopy(e, u.shortUrl)}
              />
              <Link
                target="blank"
                className="text-white"
                href={`${baseUrl + u.shortUrl}`}
              >
                {`${baseUrl + u.shortUrl}`}
              </Link>
            </td>
            <td className="flex items-center ml-auto text-slate-500 ">
              <p className="break-all cursor-auto pr-2" title={u.fullUrl}>
                {u.fullUrl?.substring(0, 30) + '...'}
              </p>
              <GiCrossMark
                title="Delete entry"
                onClick={() => startTransition(() => handleDeleteLocal(u.id))}
                className="text-lime-400 flex-none hover:text-red-500 cursor-pointer mr-4 transition-colors"
              />
              <p>{isPending}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UrlList;
