import { render, screen, waitFor} from '@testing-library/react';
import App from './App';
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


describe('API endpoint', () => {
  it('should return the expected data', async () => {
    // Make a request to your API endpoint
    const response = await fetch('http://localhost:4000/api/items');

    // Wait for the response to be available
    await waitFor(() => {
      expect(response.status).toBe(200); // Check the status code
    });


  });
});

