import UrlList from '@/components/UrlList';
import db from '@/app/utils/db';
import NewUrlForm from '@/components/NewUrlForm';
import CopyBox from '@/components/CopyBox';
import Link from 'next/link';

const Home = async () => {
  //const urls = await getData();
  return (
    <main className="flex min-h-screen items-start md:m-6 ">
      <div className="max-w-full md:max-w-xl md:container mx-auto p-0 md:px-1">
        <div className="mx-auto bg-gradient-to-b from-[#172031] rounded-xl drop-shadow-sm p-3 px-2 py-5 mt-4 mb-4 md:p-8 md:px-15 md:mb-2">
          <NewUrlForm />
          <CopyBox />
        </div>
        <UrlList />
        <div className="text-center text-slate-500 text-sm mt-7">
          <p>
            A Next JS project using Server Components by
            <Link className="font-bold" href="http://martindm.uk">
              {' '}
              Martin 🎧
            </Link>
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
      </div>
    </main>
  );
};

export default Home;
