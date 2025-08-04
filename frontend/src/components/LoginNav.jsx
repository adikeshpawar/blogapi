import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const LoginNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#1e1e2f] to-[#2a2a40] text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="text-3xl text-orange-500 font-extrabold tracking-wide">Blogapi</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-10 font-medium text-lg">
          <li>
            <Link to="/" className="hover:text-sky-400 transition duration-200">Home</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-sky-400 transition duration-200">Login</Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-sky-400 transition duration-200">Register</Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col bg-[#1e1e2f] rounded-b-md px-4 py-4 space-y-3 text-base font-medium">
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded hover:bg-slate-700"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded hover:bg-slate-700"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded hover:bg-slate-700"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LoginNav;
