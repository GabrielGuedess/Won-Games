import { build, perBuild } from '@jackfranklin/test-data-bot';
import { faker } from '@faker-js/faker';

export type UserProps = Record<'username' | 'email' | 'password', string>;

export const createUser = build<UserProps>('User', {
  fields: {
    username: perBuild(() => faker.internet.userName()),
    password: perBuild(() => faker.internet.password()),
    email: '',
  },
  postBuild: user => ({
    ...user,
    email: `${user.username.toLowerCase()}+e2e@wongames.com`,
  }),
});
