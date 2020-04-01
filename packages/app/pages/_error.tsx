import { NextPageContext, NextPage } from 'next';
import React from 'react';

interface ErrorProps {
  statusCode: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }: ErrorProps) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const errCode = err ? err.statusCode : 404;
  const statusCode = res ? res.statusCode : errCode;
  return { statusCode };
};

export default Error;
