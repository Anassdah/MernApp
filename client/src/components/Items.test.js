import { setupServer } from 'msw/node';
import { rest } from 'msw';

const mockedResponse = [  { _id: '1', name: 'Eggs' },  { _id: '2', name: 'Milk' },  { _id: '3', name: 'Steak' },  { _id: '4', name: 'Water' },];

const server = setupServer(
  rest.get('/api/items', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockedResponse),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches items from API', async () => {
  const response = await fetch('/api/items');
  const data = await response.json();

  expect(response.status).toEqual(200);
  expect(data).toEqual(mockedResponse);
});