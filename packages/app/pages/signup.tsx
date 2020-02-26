import Head from 'next/head';
import Link from 'next/link';
import { Box } from 'rebass';

import Signup from '../components/signup';

const SignupPage = () => (
  <div className='container'>
    <Head>
      <title>Sign-up</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Box as='main'>
      <Box mt={60} mx='auto' width={300}>
        <Signup />
      </Box>
    </Box>
    <footer></footer>
  </div>
);

export default SignupPage;
