import { signInValidate, signUpValidate } from '.';

describe('validations', () => {
  describe('signInValidate', () => {
    it('should validate empty fields', () => {
      const values = { email: '', password: '', username: '' };

      expect(signInValidate(values)).toMatchObject({
        email: '"email" is not allowed to be empty',
        password: '"password" is not allowed to be empty',
      });
    });

    it('should return invalid email error', () => {
      const values = { email: 'invalid', password: '1234' };

      expect(signInValidate(values)).toMatchObject({
        email: '"email" must be a valid email',
      });
    });
  });

  describe('signUpValidate', () => {
    it('should validate empty fields', () => {
      const values = { username: '', email: '', password: '' };

      expect(signUpValidate(values)).toMatchObject({
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        confirm_password: expect.any(String),
      });
    });

    it('should return short username error', () => {
      const values = { username: 'hi', email: '', password: '' };

      expect(signUpValidate(values).username).toMatchInlineSnapshot(
        '"\\"username\\" length must be at least 5 characters long"',
      );
    });

    it('should return invalid email error', () => {
      const values = {
        username: 'Gabriel',
        email: 'invalid-email',
        password: '',
      };

      expect(signUpValidate(values).email).toMatchInlineSnapshot(
        '"\\"email\\" must be a valid email"',
      );
    });

    it('should return error if password does not match with confirm password', () => {
      const values = {
        username: 'Gabriel',
        email: 'gabrielrguedess@gmail.com',
        password: '1234',
        confirm_password: '4321',
      };

      expect(signUpValidate(values).confirm_password).toMatchInlineSnapshot(
        '"\\"confirm_password\\" must be equal to \\"password\\""',
      );
    });
  });
});
