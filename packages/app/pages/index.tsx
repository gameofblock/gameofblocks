import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App test 3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>gameofblocks</main>
      <footer />
    </div>
  );
};

export default Home;
