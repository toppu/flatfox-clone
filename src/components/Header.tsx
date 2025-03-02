import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>FlatFinder</h1>
        </Link>

        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="City, zip code or address"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </form>

        <nav className="navigation">
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            Menu
          </button>
          
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li><Link to="/search">Find Property</Link></li>
            <li><Link to="/dashboard">My Favorites</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register" className="register-btn">Register</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;