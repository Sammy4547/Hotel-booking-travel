import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import ThemeToggle from '../ThemeToggle';

export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = useCallback(() => {
    try {
      dispatch(logout());
      navigate('/');
      setMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [dispatch, navigate]);

  return (
    <header className="bg-gray-200 dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          <Link to="/">Travelify</Link>
        </h1>

        {/* Desktop Nav */}
        <nav className=" md:flex gap-8 items-center text-sm font-medium">
          <Link to="/" className="hover:text-indigo-500 dark:hover:text-indigo-300">Home</Link>
          {isAuthenticated && (
            <Link to="/hotels" className="hover:text-indigo-500 dark:hover:text-indigo-300">Hotels</Link>
          )}
          <Link to="#unique-experiences" className="hover:text-indigo-500 dark:hover:text-indigo-300">Experiences</Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hover:text-red-500 dark:hover:text-red-400"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-indigo-500 dark:hover:text-indigo-300">Login</Link>
          )}
          <ThemeToggle />
        </nav>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden text-2xl px-2 py-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-gray-100 dark:bg-gray-900 text-sm font-medium">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-indigo-500 dark:hover:text-indigo-300"
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to="/hotels"
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Hotels
            </Link>
          )}
          <Link
            to="#unique-experiences"
            onClick={() => setMenuOpen(false)}
            className="hover:text-indigo-500 dark:hover:text-indigo-300"
          >
            Experiences
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-left hover:text-red-500 dark:hover:text-red-400"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Login
            </Link>
          )}
          <ThemeToggle />
        </div>
      )}
    </header>
  );
}