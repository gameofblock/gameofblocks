import React from 'react';
import { Box, Button } from 'rebass';
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms';
import { Formik } from 'formik';

const Signup = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async values => {
        const response = await fetch(`http://localhost:1337/auth/signup`, {
          body: JSON.stringify({
            password: values.password,
            username: values.username
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        });

        console.log('=> response', response);
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
              Créer un compte
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};

export default Signup;
