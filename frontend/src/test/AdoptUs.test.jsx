import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdoptUs from '../components/pages/AdoptUs';

describe('AdoptUs Page Rendering and Styles', () => {
  it('renders the AdoptUs page without crashing', () => {
    const { container } = render(<AdoptUs />);
    expect(container).toBeInTheDocument();
  });

  it('applies background and layout styles', () => {
    const { container } = render(<AdoptUs />);
    const root = container.querySelector('.adopt-page');
    expect(root).toBeInTheDocument();
  });

  it('includes at least one styled card element', () => {
    const { container } = render(<AdoptUs />);
    const card = container.querySelector('.glass-card');
    expect(card).toBeInTheDocument();
  });
});
