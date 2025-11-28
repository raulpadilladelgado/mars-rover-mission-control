import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

window.scrollTo = vi.fn();

describe('Integration: App', () => {
  it('renders the title and initial status', () => {
    render(<App />);
    expect(screen.getByText('MARS EXPLORER')).toBeInTheDocument();
    expect(screen.getByText(/OPERATIONAL/)).toBeInTheDocument();
  });

  it('moves the rover when arrow keys are pressed', async () => {
    render(<App />);
    
    expect(screen.getByText('0, 0')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'ArrowUp' });
    
    await waitFor(() => {
        expect(screen.getByText('0, 1')).toBeInTheDocument();
    });

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    await waitFor(() => {
        expect(screen.getByText('1, 1')).toBeInTheDocument();
        expect(screen.getByText('E')).toBeInTheDocument();
    });
  });

  it('resets the rover when Reset button is clicked', async () => {
    render(<App />);
    
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    await waitFor(() => expect(screen.getByText('0, 1')).toBeInTheDocument());

    fireEvent.click(screen.getByText('System Reset'));

    expect(screen.getByText('0, 0')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();
  });
});