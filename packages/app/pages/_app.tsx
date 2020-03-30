import React from 'react';
import { AppProps } from 'next/app';
import { NextPage } from 'next';

const GameOfBlocks: NextPage<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  return <Component {...pageProps} />;
};

export default GameOfBlocks;
