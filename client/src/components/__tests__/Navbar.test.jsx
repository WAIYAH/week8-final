import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '../Navbar';
import { AuthProvider } from '../../context/AuthContext';

// Mock the AuthContext
const mockAuthContext = {
  isAuthenticated: false,
  logout: vi.fn()
};

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }) => children
}));

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  it('renders the logo and navigation links', () => {
    renderNavbar();
    
    expect(screen.getByText('FirstAidGuru')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Tutorials')).toBeInTheDocument();
  });

  it('shows admin login button when not authenticated', () => {
    renderNavbar();
    
    expect(screen.getByText('Admin Login')).toBeInTheDocument();
  });
});