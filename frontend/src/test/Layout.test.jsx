import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Layout from '../components/layout/Layout';
import { MemoryRouter } from 'react-router-dom';

// Mock jwt-decode
jest.mock('jwt-decode', () => jest.fn());

import jwtDecode from 'jwt-decode';

describe('Layout Component', () => {
  let setTokenMock;

  beforeEach(() => {
    setTokenMock = jest.fn();
    localStorage.clear();
    jest.clearAllMocks();
  });

  const renderLayout = (children = <div>Test Content</div>) =>
    render(
      <MemoryRouter>
        <Layout setToken={setTokenMock}>{children}</Layout>
      </MemoryRouter>
    );

  test('renders navbar links', () => {
    jwtDecode.mockImplementation(() => ({ user: { role: 'user' } }));
    localStorage.setItem('token', 'dummy-token');

    renderLayout();

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Adopt Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Report Rescue/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.queryByText(/Admin/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  });

  test('shows Admin link if user is admin', () => {
    jwtDecode.mockImplementation(() => ({ user: { role: 'admin' } }));
    localStorage.setItem('token', 'dummy-token');

    renderLayout();

    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
  });

  test('does not show Admin link if no token or error decoding', () => {
    jwtDecode.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    renderLayout();

    expect(screen.queryByText(/Admin/i)).not.toBeInTheDocument();
  });

  test('calls setToken and removes token from localStorage on logout', () => {
    jwtDecode.mockImplementation(() => ({ user: { role: 'user' } }));
    localStorage.setItem('token', 'dummy-token');
    window.alert = jest.fn();

    renderLayout();

    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('token')).toBeNull();
    expect(setTokenMock).toHaveBeenCalledWith('');
    expect(window.alert).toHaveBeenCalledWith('Logged out');
  });

  test('renders children content', () => {
    jwtDecode.mockImplementation(() => ({ user: { role: 'user' } }));

    renderLayout(<div data-testid="child-content">Child Content Here</div>);

    expect(screen.getByTestId('child-content')).toHaveTextContent('Child Content Here');
  });
});
