/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import fetch from 'unfetch';
import { Box, Text, Button } from 'rebass';
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms';
import { Formik } from 'formik';

import { login } from '../utils/auth';

interface SigninFormValues {
  password: string;
  username: string;
}

const url = `${process.env.API_URL}/api/auth/login`

const Signin = () => {
  return (
    <Formik<SigninFormValues>
      initialValues={{ username: '', password: '' }}
      onSubmit={async values => {
        const response = await fetch(url, {
          body: JSON.stringify({
            password: values.password,
            username: values.username
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        });

        if (response.ok) {
          const { user } = await response.json();
          if (user && user.token) {
            login(user.token);
          }
        }
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => {
        return (
          <Box as='form' onSubmit={handleSubmit} py={3}>
            <Label htmlFor='email'>Username</Label>
            <Input
              id='username'
              type='text'
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Label mt={20} htmlFor='password'>
              Password
            </Label>
            <Input
              id='password'
              type='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button mt={30} type='submit'>
              Se connecter
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};

export default Signin;
