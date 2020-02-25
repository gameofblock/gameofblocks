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

        console.log('=> reponse', response);

        // const checkStatus = async (response, setSubmitting, setStatus) => {
        //   let json = null;
        //   setSubmitting(false);
        //   try {
        //     json = await response.json();
        //   } catch (errors) {
        //     setStatus({ errorMsg: errors.msg });
        //   }
        //   if (!response.ok) {
        //     ReactPiwik.push(["trackEvent", "login", "error"]);
        //     setStatus({ errorMsg: json.errors.msg });
        //     return json;
        //   }
        
        //   login({ token: json.token });
        //   Router.push(json.url);
        //   ReactPiwik.push(["trackEvent", "login", "success"]);
        //   trackUser();
        //   return json;
        // };
        
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
