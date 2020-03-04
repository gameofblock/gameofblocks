import yup from "yup";

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
});

export const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});

export const signupSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});
