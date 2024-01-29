import UrlList from '@/components/UrlList';
import db from '@/app/utils/db';

const getData = async () => {
  const urls = await db.url.findMany({
    orderBy: {
      fullUrl: 'desc',
    },
  });
  return urls;
};

const Home = async ({}) => {
  const urls = await getData();
  console.log(urls);
  return (
    <div>
      <main className="flex min-h-screen flex-col items-start m-6">
        <UrlList urls={urls} />
      </main>
    </div>
  );
};

export default Home;
