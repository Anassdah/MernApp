import { render, screen, waitFor} from '@testing-library/react';
import App from './App';
import axios from 'axios';
// const api=axios.create({
//     baseURL:"http://localhost:4000/api/items",
// })
describe('test diplay',()=> {

  test('renders the landing page', () => {
    render(<App />);
  });
  test('renders Hello world', () => {
    render(<App />);
    const linkElement = screen.getByText(/Hello world/i);
    expect(linkElement).toBeInTheDocument();
  });

})


// describe('API endpoint', () => {
//   it('should return the expected data', async () => {
//     // Make a request to your API endpoint
//     api.get('/')
//   })
// });

