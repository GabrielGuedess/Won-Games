import 'whatwg-fetch';

import { server } from '../src/utils/mockServer/server';

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
