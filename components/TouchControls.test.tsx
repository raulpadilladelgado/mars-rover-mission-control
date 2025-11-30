import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TouchControls from './TouchControls';

describe('TouchControls', () => {
  it('renders all directional buttons', () => {
    const onMove = vi.fn();
    render(<TouchControls onMove={onMove} disabled={false} />);
    
    expect(screen.getByLabelText('Move North')).toBeInTheDocument();
    expect(screen.getByLabelText('Move South')).toBeInTheDocument();
    expect(screen.getByLabelText('Move East')).toBeInTheDocument();
    expect(screen.getByLabelText('Move West')).toBeInTheDocument();
  });

  it('calls onMove with correct direction when button is clicked', () => {
    const onMove = vi.fn();
    render(<TouchControls onMove={onMove} disabled={false} />);
    
    fireEvent.click(screen.getByLabelText('Move North'));
    expect(onMove).toHaveBeenCalledWith('N');
    
    fireEvent.click(screen.getByLabelText('Move South'));
    expect(onMove).toHaveBeenCalledWith('S');
    
    fireEvent.click(screen.getByLabelText('Move East'));
    expect(onMove).toHaveBeenCalledWith('E');
    
    fireEvent.click(screen.getByLabelText('Move West'));
    expect(onMove).toHaveBeenCalledWith('W');
  });

  it('does not call onMove when disabled', () => {
    const onMove = vi.fn();
    render(<TouchControls onMove={onMove} disabled={true} />);
    
    fireEvent.click(screen.getByLabelText('Move North'));
    expect(onMove).not.toHaveBeenCalled();
  });

  it('disables all buttons when disabled prop is true', () => {
    const onMove = vi.fn();
    render(<TouchControls onMove={onMove} disabled={true} />);
    
    expect(screen.getByLabelText('Move North')).toBeDisabled();
    expect(screen.getByLabelText('Move South')).toBeDisabled();
    expect(screen.getByLabelText('Move East')).toBeDisabled();
    expect(screen.getByLabelText('Move West')).toBeDisabled();
  });

  it('renders the heading "TOUCH CONTROLS"', () => {
    const onMove = vi.fn();
    render(<TouchControls onMove={onMove} disabled={false} />);
    
    expect(screen.getByText('TOUCH CONTROLS')).toBeInTheDocument();
  });
});
