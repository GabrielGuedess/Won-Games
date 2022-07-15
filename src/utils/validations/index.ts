import joi from 'joi';

import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes';

const fieldsValidations = {
  username: joi.string().min(5).required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().required(),
  confirm_password: joi
    .string()
    .valid(joi.ref('password'))
    .messages({ 'any.only': '"confirm_password" must be equal to "password"' })
    .required(),
};

export type FieldErrors = {
  [key: string]: string;
};

type SignInValues = Omit<UsersPermissionsRegisterInput, 'username'>;

function getFieldErrors(objError: joi.ValidationResult) {
  const errors: FieldErrors = {};

  if (objError.error) {
    objError.error.details.forEach(({ path, message }) => {
      errors[path.join('.')] = message;
    });
  }

  return errors;
}

export function signUpValidate(values: SignInValues) {
  const schema = joi.object(fieldsValidations);

  return getFieldErrors(schema.validate(values, { abortEarly: false }));
}

export function signInValidate(values: SignInValues) {
  const { email, password } = fieldsValidations;
  const schema = joi.object({ email, password });

  return getFieldErrors(schema.validate(values, { abortEarly: false }));
}

type ForgotValidateParams = Pick<UsersPermissionsRegisterInput, 'email'>;

export function forgotValidate(values: ForgotValidateParams) {
  const { email } = fieldsValidations;
  const schema = joi.object({ email });

  return getFieldErrors(schema.validate(values, { abortEarly: false }));
}

type ResetValidateParams = {
  password: string;
  confirm_password: string;
};

export function resetValidate(values: ResetValidateParams) {
  const { password, confirm_password } = fieldsValidations;
  const schema = joi.object({ password, confirm_password });

  return getFieldErrors(schema.validate(values, { abortEarly: false }));
}
