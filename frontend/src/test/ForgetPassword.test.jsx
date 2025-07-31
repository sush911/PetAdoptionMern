import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import ForgotPassword from '../components/auth/ForgetPassword';

jest.mock('axios');

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the email input and button', () => {
    render(<ForgotPassword />);
    expect(screen.getByLabelText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
  });

  it('shows success message after successful submission', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Reset link sent!' } });

    render(<ForgotPassword />);
    const emailInput = screen.getByLabelText(/enter your email/i);
    const button = screen.getByRole('button', { name: /send reset link/i });

    userEvent.type(emailInput, 'test@example.com');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/reset link sent!/i)).toBeInTheDocument();
    });
  });

  it('shows error message on failed submission', async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: 'Email not found' } },
    });

    render(<ForgotPassword />);
    const emailInput = screen.getByLabelText(/enter your email/i);
    const button = screen.getByRole('button', { name: /send reset link/i });

    userEvent.type(emailInput, 'wrong@example.com');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/email not found/i)).toBeInTheDocument();
    });
  });
});
