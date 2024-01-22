import Link from 'next/link';

const UrlList = ({ urls }) => {
  if (!urls) return 'None yet';
  return urls.map((u) => {
    return (
      <>
        <div
          key={u.id}
          className={`px-8 py-2 border border-black/25 cursor-pointer`}
        >
          <p>
            {u.fullUrl} -{' '}
            <Link target="blank" href={u.fullUrl}>
              {u.shortUrl}
            </Link>{' '}
          </p>
        </div>
      </>
    );
  });
};
export default UrlList;
