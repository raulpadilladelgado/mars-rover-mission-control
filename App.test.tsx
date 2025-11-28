import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import * as marsRover from './domain/marsRover';

window.scrollTo = vi.fn();

describe('Integration: App', () => {
  beforeEach(() => {
    // Mock generateObstacles to return an empty array for predictable tests
    vi.spyOn(marsRover, 'generateObstacles').mockReturnValue([]);
  });

  it('renders the title and initial status', () => {
    render(<App />);
    expect(screen.getByText('MARS EXPLORER')).toBeInTheDocument();
    expect(screen.getByText(/OPERATIONAL/)).toBeInTheDocument();
  });

  it('moves the rover when arrow keys are pressed', async () => {
    render(<App />);
    
    expect(screen.getByText('0, 0')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'ArrowUp' });
    
    await waitFor(() => {
        expect(screen.getByText('0, 1')).toBeInTheDocument();
    }, { timeout: 2000 });

    // Wait a bit before the next move to ensure the first sequence is complete
    await new Promise(resolve => setTimeout(resolve, 500));

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    
    await waitFor(() => {
        expect(screen.getByText('1, 1')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    await waitFor(() => {
        expect(screen.getByText('E')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('resets the rover when Reset button is clicked', async () => {
    render(<App />);
    
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    await waitFor(() => expect(screen.getByText('0, 1')).toBeInTheDocument(), { timeout: 2000 });

    fireEvent.click(screen.getByText('System Reset'));

    expect(screen.getByText('0, 0')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();
  });
});