import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import './HomePage.css';

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  area: number;
  rooms: number;
  images: string[];
  isNew: boolean;
  isPremium: boolean;
}

interface City {
  name: string;
  count: number;
}

// Mock data for featured properties
const FEATURED_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Modern 2.5 room apartment with balcony",
    price: 1850,
    location: "Zurich, 8005",
    area: 65,
    rooms: 2.5,
    images: ["/api/placeholder/400/320"],
    isNew: true,
    isPremium: false
  },
  {
    id: 2,
    title: "Spacious 3.5 room apartment near lake",
    price: 2300,
    location: "Zurich, 8002",
    area: 85,
    rooms: 3.5,
    images: ["/api/placeholder/400/320", "/api/placeholder/400/320"],
    isNew: false,
    isPremium: true
  },
  {
    id: 3,
    title: "Cozy 1.5 room studio in city center",
    price: 1400,
    location: "Zurich, 8001",
    area: 40,
    rooms: 1.5,
    images: ["/api/placeholder/400/320", "/api/placeholder/400/320"],
    isNew: true,
    isPremium: false
  },
  {
    id: 4,
    title: "Luxury 4.5 room penthouse with terrace",
    price: 3800,
    location: "Zurich, 8008",
    area: 120,
    rooms: 4.5,
    images: ["/api/placeholder/400/320", "/api/placeholder/400/320", "/api/placeholder/400/320"],
    isNew: false,
    isPremium: true
  }
];

const HomePage: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [popularCities, setPopularCities] = useState<City[]>([
    { name: "Zurich", count: 1245 },
    { name: "Geneva", count: 873 },
    { name: "Basel", count: 652 },
    { name: "Bern", count: 418 },
    { name: "Lausanne", count: 392 },
    { name: "Lugano", count: 287 }
  ]);

  useEffect(() => {
    // Simulating API call to fetch featured properties
    setFeaturedProperties(FEATURED_PROPERTIES);
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Home in Switzerland</h1>
          <p>Browse thousands of apartments and houses for rent or sale</p>
          <div className="hero-buttons">
            <Link to="/search?type=rent" className="btn btn-primary">Rent</Link>
            <Link to="/search?type=buy" className="btn btn-secondary">Buy</Link>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Properties</h2>
          <Link to="/search" className="view-all-link">View all</Link>
        </div>
        <div className="property-grid">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="cities-section">
        <h2>Popular Cities</h2>
        <div className="cities-grid">
          {popularCities.map(city => (
            <Link to={`/search?location=${city.name}`} key={city.name} className="city-card">
              <h3>{city.name}</h3>
              <p>{city.count} properties</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <h2>How FlatFinder Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">🔍</div>
            <h3>Search</h3>
            <p>Browse thousands of verified property listings</p>
          </div>
          <div className="step">
            <div className="step-icon">📱</div>
            <h3>Contact</h3>
            <p>Directly message landlords and property managers</p>
          </div>
          <div className="step">
            <div className="step-icon">🏠</div>
            <h3>View</h3>
            <p>Schedule viewings at your convenience</p>
          </div>
          <div className="step">
            <div className="step-icon">📝</div>
            <h3>Apply</h3>
            <p>Submit your application online</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;