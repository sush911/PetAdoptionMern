import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from '../components/pages/About';

describe('About Page Styling and Render', () => {
  it('renders without crashing', () => {
    const { container } = render(<About />);
    expect(container).toBeInTheDocument();
  });

  it('contains the glass-card class', () => {
    const { container } = render(<About />);
    const glassCard = container.querySelector('.glass-card');
    expect(glassCard).toBeInTheDocument();
  });

  it('uses correct font family', () => {
    const { container } = render(<About />);
    const aboutPage = container.querySelector('.about-page');
    expect(aboutPage).toBeInTheDocument();
  });
});
