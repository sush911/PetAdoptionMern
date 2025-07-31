import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../components/home/Home';
import { MemoryRouter } from 'react-router-dom';

describe('Home Page Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });

  it('renders main hero heading', () => {
    const heading = screen.getByText(/Welcome to PetForPat/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders adoption call-to-action button', () => {
    const button = screen.getByRole('button', { name: /Explore Adoptions/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-warning');
  });

  it('renders feature cards with correct icons and text', () => {
    expect(screen.getByText(/Adopt Pets/i)).toBeInTheDocument();
    expect(screen.getByText(/Rescue Missions/i)).toBeInTheDocument();
    expect(screen.getByText(/Furry Friends/i)).toBeInTheDocument();
    expect(screen.getByText(/Purr-fect Cats/i)).toBeInTheDocument();
  });

  it('applies key styling classes from Home.css', () => {
    const hero = document.querySelector('.home-hero-section');
    const overlay = document.querySelector('.glass-overlay');
    const features = document.querySelectorAll('.feature-card');

    expect(hero).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    expect(features.length).toBe(4);
  });
});
