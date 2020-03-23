export const isBrowser = () => {
  return typeof window !== 'undefined';
};

export const formatUserFromToken = currentUser => {
  if (currentUser) {
    return {
      __typename: 'CurrentUser',
      id: currentUser['https://hasura.io/jwt/claims']['x-hasura-user-id'],
      role:
        currentUser['https://hasura.io/jwt/claims']['x-hasura-default-role']
    };
  } else {
    return null;
  }
};
