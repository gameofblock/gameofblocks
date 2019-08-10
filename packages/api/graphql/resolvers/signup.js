const resolvers = {
  Mutation: {
    signup: async (_, { username, password }, { dataSources }) => {
      const { user } = await dataSources.authAPI.signup({
        username,
        password
      });
      return user;
    }
  }
};

export default resolvers;
