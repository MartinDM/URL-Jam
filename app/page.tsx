import db from '@/utils/db';

const getData = async () => {
  const urls = await db.url.findMany({});
  return urls;
};

const Home = async ({ urls }) => {
  const urls = await getData();
  console.log(urls);
  return (
    <div>
      <div>Home </div>
      <table>
        <tr>
          {urls.length
            ? urls.map((u) => <td key={u.id}>0{u.fullUrl}</td>)
            : 'None yet'}
        </tr>
      </table>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <form action='getData' className='w-full max-w-sm'>
          <div className='flex items-center border-b border-teal-500 py-2'>
            <input
              className='appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none'
              type='text'
              name='fullUrl'
              placeholder='http://'
              aria-label='Full Url'
            />
            <button
              className='flex-shrink-0 bg-teal-500 uppercase hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
              type='submit'
            >
              Jam
            </button>
            <button
              className='flex-shrink-0 font-bold border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded'
              type='submit'
            >
              Clear
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
