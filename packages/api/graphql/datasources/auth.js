import RESTDataSource from "apollo-datasource-rest";

class AuthAPI extends RESTDataSource.RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://127.0.0.1:1337/";
  }

  async registerUser({
    email,
    lastName,
    password,
    firstName,
    globalRole,
    invitationCode
  }) {
    const response = await this.post("auth/signup", {
      email,
      lastName,
      password,
      firstName,
      globalRole,
      invitationCode
    });
    return response;
  }

  async login({ username, password }) {
    try {
      const response = await this.post("auth/login", {
        username,
        password
      });
      return response;
    } catch (err) {
      console.log(err);
    }
    return { success: false };
  }

  async signup({ username, password }) {
    try {
      const response = await this.post("auth/signup", {
        username,
        password
      });
      return response;
    } catch (err) {
      console.log(err);
    }
    return { success: false };
  }
}

export default AuthAPI;
