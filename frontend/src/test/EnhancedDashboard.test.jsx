// src/test/EnhancedDashboard.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import EnhancedDashboard from '../components/dashboard/EnhancedDashboard';

describe('EnhancedDashboard Component', () => {
  test('renders dashboard title with correct class', () => {
    render(<EnhancedDashboard />);
    const titleElement = screen.getByText(/admin dashboard/i);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('dashboard-title');
  });

  test('renders section cards', () => {
    render(<EnhancedDashboard />);
    const sectionCards = screen.getAllByText(/dashboard content/i);
    expect(sectionCards.length).toBeGreaterThanOrEqual(1);
    sectionCards.forEach(card => {
      expect(card.parentElement).toHaveClass('section-card');
    });
  });
});
