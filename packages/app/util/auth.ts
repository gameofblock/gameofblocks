import cookie from 'js-cookie';

export const login = async (token: string) => {
  cookie.set('token', token, { expires: 1 });
  localStorage.setItem('token', token);
};
