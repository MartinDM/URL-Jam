import UrlList from '@/components/UrlList';
import db from '@/app/utils/db';
import NewUrlForm from '@/components/NewUrlForm';
import CopyBox from '@/components/CopyBox';
import Link from 'next/link';

const Home = async () => {
  //const urls = await getData();
  return (
    <main className="flex min-h-screen flex-col items-start m-6">
      <div className="container mx-auto p-8 px-16 mb-10 max-w-lg bg-gradient-to-b from-[#172031] rounded-xl drop-shadow-sm">
        <NewUrlForm />
        <CopyBox />
      </div>
      <div className="container p-3 px-16">
        <UrlList />
      </div>
      <div className="container text-center text-slate-500 text-sm mt-7">
        <p>
          A Next JS project using Server Components by
          <Link className="font-bold" href="http://martindm.uk">
            {' '}
            Martin 🎧
          </Link>{' '}
        </p>
        <p>
          Check it out on{' '}
          <Link
            className="font-bold"
            href="https://github.com/MartinDM/url-jam"
          >
            Github
          </Link>{' '}
        </p>
      </div>
    </main>
  );
};

export default Home;
