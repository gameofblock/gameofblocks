import { NextPageContext } from 'next';
import React from 'react';

interface Props {
  statusCode: number;
}

const Error = ({ statusCode }: Props): FunctionComponent => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext): Props => {
  const errCode = err ? err.statusCode : 404;
  const statusCode = res ? res.statusCode : errCode;
  return { statusCode };
};

export default Error;
