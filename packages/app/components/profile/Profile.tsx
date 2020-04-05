import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { USER } from './queries';

export const Profile: FunctionComponent = () => {
  const { data, error } = useQuery(USER);
  if (error) {
    return <div>{error.message}</div>;
  }
  return <div>{JSON.stringify(data)}</div>;
};

export default Profile;
