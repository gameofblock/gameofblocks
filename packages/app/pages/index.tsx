import Head from 'next/head';
import { Box } from 'rebass';

import Signin from '../components/signin';

const Home = () => (
  <div className='container'>
    <Head>
      <title>Create Next App</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Box as='main'>
      <Box mt={60} mx="auto" width={300}>
        <Signin />
      </Box>
    </Box>
    <footer></footer>
  </div>
);

export default Home;
