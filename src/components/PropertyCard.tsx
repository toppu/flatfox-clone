import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

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

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { id, title, price, location, area, rooms, images, isNew, isPremium } = property;
  
  return (
    <div className={`property-card ${isPremium ? 'premium' : ''} ${isNew ? 'new' : ''}`}>
      {isNew && <span className="new-badge">New</span>}
      {isPremium && <span className="premium-badge">Premium</span>}
      
      <Link to={`/property/${id}`}>
        <div className="property-image">
          <img src={images[0]} alt={title} />
          <span className="image-count">{images.length} photos</span>
        </div>
        
        <div className="property-details">
          <h3 className="property-title">{title}</h3>
          <p className="property-location">{location}</p>
          <div className="property-specs">
            <span>{rooms} rooms</span>
            <span>{area} m²</span>
          </div>
          <p className="property-price">CHF {price.toLocaleString()}</p>
        </div>
      </Link>
      
      <button className="favorite-button">♡</button>
    </div>
  );
};

export default PropertyCard;