import { useQuery } from '@apollo/react-hooks';
import React, { createContext, Fragment, FunctionComponent } from 'react';
import { Text } from 'rebass';

import { UserIdentifier, QueryProps } from './types';
import { CURRENT_USER } from '../../queries/user';

export const Context = createContext({});

const UserProvider: FunctionComponent<UserIdentifier> = props => {
  const { userId, children } = props;
  const { data } = useQuery<QueryProps>(CURRENT_USER, {
    variables: {
      userId
    },
    fetchPolicy: 'network-only'
  });

  if (!data) {
    return <Text>loading</Text>;
  }

  const [currentUser] = data.user;
  return <Context.Provider value={null}>{children}</Context.Provider>;
};

export const Provider: FunctionComponent<{
  user: any /* TODO */;
}> = props => {
  const { children, user } = props;
  const role = user ? user.role : null;
  const userId = user ? user.id : null;

  if (userId) {
    return (
      <UserProvider role={role} userId={userId}>
        {children}
      </UserProvider>
    );
  }

  return <Fragment>{children}</Fragment>;
};

export const { Consumer } = Context;
