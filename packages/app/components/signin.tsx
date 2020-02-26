import React from 'react';
import fetch from 'unfetch';
import { Box, Text, Button } from 'rebass';
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms';
import { Formik } from 'formik';

const Signin = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async values => {
        const response = await fetch(`http://localhost:1337/auth/login`, {
          body: JSON.stringify({
            password: values.password,
            username: values.username
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        });        
      }}
    >
      {({
        values,
        touched,
        errors,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
      }) => {
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
