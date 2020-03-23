import React, { Fragment, Dispatch, SetStateAction, useState } from 'react';
import { useFormik, FormikHelpers } from 'formik';
import { Label, Input } from '@rebass/forms';
import fetch from 'unfetch';
import { Text, Button, Box } from 'rebass';

import { ForgotPasswordRequestState, ForgotPasswordFormValues } from './types';

const url = `${process.env.API_URL}/api/auth/forgot-password`;

async function onSubmit(
  values: ForgotPasswordFormValues,
  formikHelpers: FormikHelpers<ForgotPasswordFormValues>,
  setRequestState: Dispatch<SetStateAction<ForgotPasswordRequestState>>
): Promise<void> {
  const response = await fetch(url, {
    body: JSON.stringify({ email: values.email }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  setRequestState(
    response.ok
      ? ForgotPasswordRequestState.SUCCEEDED
      : ForgotPasswordRequestState.FAILED
  );

  formikHelpers.setSubmitting(false);
}

const ForgotPasswordForm = () => {
  const [requestState, setRequestState] = useState<ForgotPasswordRequestState>(
    ForgotPasswordRequestState.DEFAULT
  );

  const { handleSubmit, handleChange, values } = useFormik<
    ForgotPasswordFormValues
  >({
    initialValues: { email: '' },
    onSubmit: (values, formikHelpers) =>
      onSubmit(values, formikHelpers, setRequestState)
  });

  return (
    <Fragment>
      {requestState === ForgotPasswordRequestState.SUCCEEDED && (
        <Text>We just emailed you. Please check your mailbox.</Text>
      )}

      {requestState === ForgotPasswordRequestState.FAILED && (
        <Text>Oops! Something went wrong!</Text>
      )}

      <Box as='form' onSubmit={handleSubmit}>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          type='email'
          onChange={handleChange}
          value={values.email}
        />
        <Button type='submit'>Valider</Button>
      </Box>
    </Fragment>
  );
};

export default ForgotPasswordForm;
