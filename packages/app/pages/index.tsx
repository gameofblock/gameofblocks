import Head from 'next/head';

const Home = props => {
  return (
    <div className='container'>
      <Head>
        <title>Create Next App test 3</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <button>Se connecter</button>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
