// src/test/PetForm.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PetForm from '../components/pets/PetForm';
import api from '../api/axios';

// Mock the api calls
jest.mock('../api/axios');

describe('PetForm Component', () => {
  const mockOnPetAdded = jest.fn();
  const mockOnCancelEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with initial empty values', () => {
    render(<PetForm onPetAdded={mockOnPetAdded} />);

    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/type/i)).toHaveValue('dog');
    expect(screen.getByLabelText(/age/i)).toHaveValue(null);
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
    expect(screen.getByText(/add pet/i)).toBeInTheDocument();
    expect(screen.queryByText(/cancel/i)).not.toBeInTheDocument();
  });

  test('renders form with existing pet data and shows cancel button', () => {
    const existingPet = {
      _id: '123',
      name: 'Buddy',
      type: 'Cat',
      age: 5,
      description: 'Cute cat',
    };

    render(
      <PetForm
        existingPet={existingPet}
        onPetAdded={mockOnPetAdded}
        onCancelEdit={mockOnCancelEdit}
      />
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue('Buddy');
    expect(screen.getByLabelText(/type/i)).toHaveValue('cat');
    expect(screen.getByLabelText(/age/i)).toHaveValue(5);
    expect(screen.getByLabelText(/description/i)).toHaveValue('Cute cat');
    expect(screen.getByText(/update pet/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  test('calls onCancelEdit when cancel button is clicked', () => {
    const existingPet = {
      _id: '123',
      name: 'Buddy',
      type: 'cat',
      age: 5,
      description: 'Cute cat',
    };

    render(
      <PetForm
        existingPet={existingPet}
        onPetAdded={mockOnPetAdded}
        onCancelEdit={mockOnCancelEdit}
      />
    );

    fireEvent.click(screen.getByText(/cancel/i));
    expect(mockOnCancelEdit).toHaveBeenCalledTimes(1);
  });

  test('submits form data correctly when adding new pet', async () => {
    api.post.mockResolvedValueOnce({ data: { id: 'abc', name: 'Fluffy' } });

    render(<PetForm onPetAdded={mockOnPetAdded} />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Fluffy' } });
    fireEvent.change(screen.getByLabelText(/type/i), { target: { value: 'cat' } });
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: 3 } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Very cute cat' } });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        '/pets',
        expect.any(FormData),
        expect.objectContaining({ headers: { 'Content-Type': 'multipart/form-data' } })
      );
      expect(mockOnPetAdded).toHaveBeenCalledWith({ id: 'abc', name: 'Fluffy' });
    });
  });

  test('shows error message on API failure', async () => {
    api.post.mockRejectedValueOnce({ response: { data: { message: 'Error saving pet' } } });

    render(<PetForm onPetAdded={mockOnPetAdded} />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Fluffy' } });
    fireEvent.change(screen.getByLabelText(/type/i), { target: { value: 'cat' } });
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: 3 } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Very cute cat' } });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByText(/error saving pet/i)).toBeInTheDocument();
      expect(mockOnPetAdded).not.toHaveBeenCalled();
    });
  });
});
