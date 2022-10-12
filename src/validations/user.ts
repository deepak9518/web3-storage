import * as yup from 'yup';

export const signupValidation = yup.object().shape({
  email: yup.string().required('Email is Required').email('Email is Invalid'),
  firstName: yup.string().required('Name is Required').max(50, 'Name must be smaller than 50 characters'),
  lastName: yup.string().required('Name is Required').max(50, 'Name must be smaller than 50 characters'),
  password: yup
    .string()
    .required('Password is Required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&.])[A-Za-z\d@$!%*#?&.]{8,}$/, 'Incorrect Password format'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});
