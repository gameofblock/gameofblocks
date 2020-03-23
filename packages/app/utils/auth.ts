import cookie from 'js-cookie';

export const login = (token: string): void => {
  cookie.set('token', token, { expires: 1 });
  localStorage.setItem('token', token);
};
