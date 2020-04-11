import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { USER, UserQueryProps } from './queries';

export const Profile: FunctionComponent = () => {
  const { data, error, loading } = useQuery<UserQueryProps>(USER);
  if (error) {
    return <div>{error.message}</div>;
  }

  if (loading) {
    return <div>Chargement...</div>;
  }

  const [user] = data.user;
  const lastLoginDate = new Date(user.last_login);

  return (
    <div>
      {user.picture && <img src={user.picture} alt="avatar" />}
      <div>{`Email: ${user.email}`}</div>
      <div>
        {`Last login: ${lastLoginDate.toLocaleDateString()} ${lastLoginDate.toLocaleTimeString()}`}
      </div>
      <a href="/logout">
        <button type="button">logout</button>
      </a>
    </div>
  );
};

export default Profile;
