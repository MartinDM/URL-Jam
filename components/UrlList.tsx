'use client';
import Link from 'next/link';
import { GiCrossMark } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import { useUrlContext } from '@/app/urlProvider';
import { useTransition } from 'react';
import { FaRegCopy } from 'react-icons/fa6';
import ClipLoader from 'react-spinners/ClipLoader';
import { ValidEntry } from '@/app/utils/validations';

const UrlList = () => {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { urls, loading } = useUrlContext();
  const [localUrls, setLocalUrls] = urls;
  const [isLoading, setIsLoading] = loading;

  let baseUrl = './short';
  if (typeof window !== 'undefined') {
    baseUrl = window.location.href + 'short/';
  }

  const handleCopy = async (e: MouseEvent, url: string) => {
    const shortUrl = `${window.location.href}short/${url}`;
    await navigator.clipboard.writeText(shortUrl);
  };

  const handleDeleteLocal = (id: string) => {
    const newUrls = localUrls.filter((u: ValidEntry) => u.id !== id);
    startTransition(() => {
      setLocalUrls(newUrls);
    });
  };

  useEffect(() => {
    if (localUrls) {
      setIsLoading(false);
    }
  }, []);

  if (!localUrls?.length) return;

  return (
    <>
      {isLoading && (
        <ClipLoader
          loading={true}
          color="#a3e635"
          className="m-auto"
          cssOverride={{ display: 'block' }}
        />
      )}
      <div className="p-4 pt-0 lg:max-w-3xl ">
        <h3 className="mx-auto text-left text-lime-400 text-lg">Your URLs</h3>
        <ul>
          {localUrls.map((u: ValidEntry) => (
            <li
              key={u.id}
              className={`py-1 border-b border-b-slate-700 ${
                isPending ? 'opacity-30' : ''
              }`}
            >
              <div className="flex py-1 md:py-3 md:pb-1 items-center">
                <GiCrossMark
                  title="Delete entry"
                  onClick={() => startTransition(() => handleDeleteLocal(u.id))}
                  className="text-lime-400 cursor-pointer min-w-2 hover:text-red-500 text-md mr-4 transition-colors"
                />

                <Link
                  target="blank"
                  className="text-white"
                  href={`${baseUrl + u.shortUrl}`}
                >
                  {baseUrl + u.shortUrl}
                </Link>
                <FaRegCopy
                  title="Copy short Url"
                  className="cursor-pointer min-w-2 ml-3 text-md text-white mr-4 hover:text-lime-200 transition-colors"
                  onClick={(e) => handleCopy(e, u.shortUrl)}
                />
              </div>
              <div className="flex items-center py-1 md:py-2 md:pt-0 md:ml-auto text-slate-500">
                <p
                  className="break-all cursor-auto pr-2 truncate text-ellipsis overflow-hidden "
                  title={u.fullUrl}
                >
                  {u.fullUrl.length > 50
                    ? u.fullUrl.substring(0, 50) + '...'
                    : u.fullUrl}{' '}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UrlList;
