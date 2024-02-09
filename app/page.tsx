import UrlList from '@/components/UrlList';
import db from '@/app/utils/db';
import NewUrlForm from '@/components/NewUrlForm';
import CopyBox from '@/components/CopyBox';
import { useUrlContext } from './urlProvider';

const getData = async () => {
  const urls = await db.url.findMany({
    orderBy: {
      id: 'desc',
    },
  });
  return urls;
};

const Home = async () => {
  const urls = await getData();
  return (
    <main className="flex min-h-screen flex-col items-start m-6">
      <div className="container mx-auto p-8 px-16 mb-10 max-w-lg bg-gradient-to-b from-[#172031] rounded-xl drop-shadow-sm">
        <NewUrlForm />
        <CopyBox />
      </div>
      <div className="container p-3 px-16 min-w-[60%]">
        <UrlList urls={urls} />
      </div>
    </main>
  );
};

export default Home;
