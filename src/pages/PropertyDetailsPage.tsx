// pages/PropertyDetailsPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PropertyDetailsPage.css';

interface PropertyDetail {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  area: number;
  rooms: number;
  floor: number;
  availableFrom: string;
  features: string[];
  images: string[];
  landlord: {
    name: string;
    phone: string;
    email: string;
  };
  mapLocation: {
    lat: number;
    lng: number;
  };
  isNew: boolean;
  isPremium: boolean;
}

const MOCK_PROPERTY_DETAILS: PropertyDetail = {
  id: 1,
  title: "Modern 2.5 room apartment with balcony",
  description: "This beautiful apartment is located in a quiet residential area with excellent public transport connections. The apartment features a modern kitchen, a spacious living room with access to the balcony, a bedroom, and a bathroom with shower. The apartment is bright and has been recently renovated.",
  price: 1850,
  location: "Zurich, 8005",
  address: "Musterstrasse 123, 8005 Zürich",
  area: 65,
  rooms: 2.5,
  floor: 3,
  availableFrom: "April 1, 2025",
  features: [
    "Balcony",
    "Elevator",
    "Dishwasher",
    "Washing machine",
    "Wooden floors",
    "Public transport nearby",
    "Pets allowed"
  ],
  images: [
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600"
  ],
  landlord: {
    name: "Swiss Property Management",
    phone: "+41 44 123 45 67",
    email: "info@swisspropertymanagement.ch"
  },
  mapLocation: {
    lat: 47.3769,
    lng: 8.5417
  },
  isNew: true,
  isPremium: false
};

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  useEffect(() => {
    // Simulate API fetch for property details
    setLoading(true);
    
    // For demo purposes, we'll just use the mock data
    setTimeout(() => {
      setProperty(MOCK_PROPERTY_DETAILS);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return <div className="loading-container">Loading property details...</div>;
  }

  if (!property) {
    return <div className="error-container">Property not found</div>;
  }

  return (
    <div className="property-details-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> {'>'} 
        <Link to="/search">Search</Link> {'>'} 
        <span>{property.title}</span>
      </div>
      
      <div className="property-header">
        <div className="property-title-section">
          <h1>{property.title}</h1>
          <p className="property-address">{property.address}</p>
        </div>
        <div className="property-price-section">
          <p className="property-price">CHF {property.price.toLocaleString()}</p>
          <button className="favorite-button">Add to Favorites</button>
        </div>
      </div>
      
      <div className="property-gallery">
        <div className="main-image">
          <img src={property.images[activeImageIndex]} alt={`${property.title} - View ${activeImageIndex + 1}`} />
        </div>
        <div className="thumbnail-gallery">
          {property.images.map((image, index) => (
            <div 
              key={index} 
              className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="property-content">
        <div className="property-details-section">
          <h2>Property Details</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Rooms</span>
              <span className="detail-value">{property.rooms}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Area</span>
              <span className="detail-value">{property.area} m²</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Floor</span>
              <span className="detail-value">{property.floor}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Available from</span>
              <span className="detail-value">{property.availableFrom}</span>
            </div>
          </div>
          
          <h3>Description</h3>
          <p className="property-description">{property.description}</p>
          
          <h3>Features</h3>
          <ul className="features-list">
            {property.features.map((feature, index) => (
              <li key={index} className="feature-item">{feature}</li>
            ))}
          </ul>
        </div>
        
        <div className="property-sidebar">
          <div className="contact-card">
            <h3>Contact Landlord</h3>
            <p className="landlord-name">{property.landlord.name}</p>
            <p className="landlord-contact">
              <strong>Phone:</strong> {property.landlord.phone}
            </p>
            <p className="landlord-contact">
              <strong>Email:</strong> {property.landlord.email}
            </p>
            
            <form className="contact-form">
              <textarea placeholder="Message to landlord" rows={4}></textarea>
              <button type="submit" className="contact-btn">Send Message</button>
            </form>
            
            <button className="schedule-viewing-btn">Schedule Viewing</button>
          </div>
          
          <div className="location-card">
            <h3>Location</h3>
            <div className="map-placeholder">
              <img src="/api/placeholder/300/200" alt="Map location" />
              <p className="map-address">{property.address}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="similar-properties">
        <h2>Similar Properties</h2>
        <p className="see-more-link">
          <Link to="/search">See more properties in {property.location.split(',')[0]}</Link>
        </p>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;