// pages/SearchResultsPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';
import './SearchResultsPage.css';

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

interface Filters {
  propertyType?: string;
  minPrice?: string;
  maxPrice?: string;
  minRooms?: string;
  maxRooms?: string;
  minArea?: string;
  maxArea?: string;
}

const MOCK_PROPERTIES: Property[] = [
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
    images: ["/api/placeholder/400/320"],
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
    images: ["/api/placeholder/400/320", "/api/placeholder/400/320"],
    isNew: false,
    isPremium: true
  },
  {
    id: 5,
    title: "Renovated 2.5 room apartment in old town",
    price: 1950,
    location: "Zurich, 8001",
    area: 58,
    rooms: 2.5,
    images: ["/api/placeholder/400/320"],
    isNew: false,
    isPremium: false
  },
  {
    id: 6,
    title: "Family-friendly 4 room apartment with garden",
    price: 2600,
    location: "Zurich, 8057",
    area: 110,
    rooms: 4,
    images: ["/api/placeholder/400/320", "/api/placeholder/400/320"],
    isNew: true,
    isPremium: false
  }
];

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Filters>({});
  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      setProperties(MOCK_PROPERTIES);
      setLoading(false);
    }, 500);
  }, [location.search]);

  const handleFilterChange = (filters: Filters) => {
    setActiveFilters(filters);
    
    let filtered = [...MOCK_PROPERTIES];
    
    if (filters.propertyType && filters.propertyType !== 'all') {
      // This would require property type in the mock data
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice || '0'));
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice || '0'));
    }
    
    if (filters.minRooms) {
      filtered = filtered.filter(p => p.rooms >= parseFloat(filters.minRooms || '0'));
    }
    
    if (filters.maxRooms) {
      filtered = filtered.filter(p => p.rooms <= parseFloat(filters.maxRooms || '0'));
    }
    
    if (filters.minArea) {
      filtered = filtered.filter(p => p.area >= parseFloat(filters.minArea || '0'));
    }
    
    if (filters.maxArea) {
      filtered = filtered.filter(p => p.area <= parseFloat(filters.maxArea || '0'));
    }
    
    setProperties(filtered);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSortOption(option);
    
    let sorted = [...properties];
    switch (option) {
      case 'newest':
        // Would require date property in real data
        break;
      case 'price_asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rooms_asc':
        sorted.sort((a, b) => a.rooms - b.rooms);
        break;
      case 'rooms_desc':
        sorted.sort((a, b) => b.rooms - a.rooms);
        break;
      default:
        break;
    }
    
    setProperties(sorted);
  };

  return (
    <div className="search-results-page">
      <div className="search-header">
        <h1>Properties in {query.get('q') || 'Switzerland'}</h1>
        <p>{properties.length} properties found</p>
      </div>
      
      <div className="search-container">
        <aside className="search-sidebar">
          <SearchFilters onFilterChange={handleFilterChange} />
        </aside>
        
        <div className="search-results">
          <div className="results-controls">
            <div className="sort-controls">
              <label>Sort by:</label>
              <select value={sortOption} onChange={handleSortChange}>
                <option value="newest">Newest first</option>
                <option value="price_asc">Price (low to high)</option>
                <option value="price_desc">Price (high to low)</option>
                <option value="rooms_asc">Rooms (low to high)</option>
                <option value="rooms_desc">Rooms (high to low)</option>
              </select>
            </div>
            
            <div className="view-controls">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="loading-indicator">Loading properties...</div>
          ) : (
            <div className={`properties-${viewMode}`}>
              {properties.length > 0 ? (
                properties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))
              ) : (
                <div className="no-results">
                  <h3>No properties found</h3>
                  <p>Try adjusting your search filters</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;