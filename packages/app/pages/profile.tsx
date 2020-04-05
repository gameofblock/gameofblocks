import React, { FunctionComponent } from 'react';

import { Profile } from '../components/profile';
import withApollo from '../lib/withApollo';

const ProfilePage: FunctionComponent = () => {
  return <Profile />;
};

export default withApollo(ProfilePage);
