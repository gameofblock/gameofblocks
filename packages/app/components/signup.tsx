import React from 'react';
import { Box, Text } from 'rebass';
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms';
import { Formik } from 'formik';

const Signup = () => {
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={async values => {
        
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
            <Text>test</Text>
          </Box>
        );
      }}
    </Formik>
  );
};

export default Signup;
