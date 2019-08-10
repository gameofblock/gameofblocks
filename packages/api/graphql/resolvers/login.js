const resolvers = {
  Mutation: {
    login: async (_, { username, password }, { dataSources }) => {
      const { user } = await dataSources.authAPI.login({
        username,
        password
      });
      return user;
    }
  }
};

export default resolvers;
