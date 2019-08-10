import merge from "lodash/merge";
import login from "./login";
import signup from "./signup";

const resolvers = merge(login, signup);

export default resolvers;
