import Link from 'next/link';
import { GiCrossMark } from 'react-icons/gi';

const UrlList = ({ urls }) => {
  if (!urls) return 'None yet';
  return urls.map((u) => {
    return (
      <>
        <div
          key={u.id}
          className={`px-8 py-2 border border-bottom cursor-pointer  `}
        >
          <p>
            {u.fullUrl} -{' '}
            <Link target="blank" href={u.fullUrl}>
              {u.shortUrl} <GiCrossMark className="text-teal-200" />
            </Link>{' '}
          </p>
        </div>
      </>
    );
  });
};
export default UrlList;
