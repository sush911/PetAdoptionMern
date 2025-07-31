import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../contact/Contact';
import axios from 'axios';

// Mock axios post method
jest.mock('axios');

describe('Contact component', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test('renders form and submits successfully', async () => {
    // Mock axios.post to resolve successfully
    axios.post.mockResolvedValueOnce({ data: { message: 'Success' } });

    render(<Contact />);

    // Fill inputs
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello, I want to adopt a pet!' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    // Check "Sending..." status appears
    expect(screen.getByText(/Sending.../i)).toBeInTheDocument();

    // Wait for the axios.post to resolve and success message to appear
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/contact', {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I want to adopt a pet!',
      });
      expect(screen.getByText(/✅ Message sent successfully!/i)).toBeInTheDocument();
    });

    // Check that inputs are cleared after successful submit
    expect(screen.getByLabelText(/Name/i).value).toBe('');
    expect(screen.getByLabelText(/Email/i).value).toBe('');
    expect(screen.getByLabelText(/Message/i).value).toBe('');
  });

  test('shows error message on failed submit', async () => {
    // Mock axios.post to reject (simulate failure)
    axios.post.mockRejectedValueOnce(new Error('Network error'));

    render(<Contact />);

    // Fill inputs
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Help!' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    // Check "Sending..." status appears
    expect(screen.getByText(/Sending.../i)).toBeInTheDocument();

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/❌ Failed to send message. Please try again./i)).toBeInTheDocument();
    });
  });
});
