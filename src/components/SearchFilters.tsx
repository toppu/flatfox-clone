import React, { useState, ChangeEvent, FormEvent } from 'react';
import './SearchFilters.css';

interface Filters {
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  minRooms: string;
  maxRooms: string;
  minArea: string;
  maxArea: string;
}

interface SearchFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({
    propertyType: 'all',
    minPrice: '',
    maxPrice: '',
    minRooms: '',
    maxRooms: '',
    minArea: '',
    maxArea: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <div className="search-filters">
      <h3>Filter Properties</h3>
      <form onSubmit={handleSubmit}>
        <div className="filter-group">
          <label>Property Type</label>
          <select name="propertyType" value={filters.propertyType} onChange={handleChange}>
            <option value="all">All</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="studio">Studio</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Price (CHF)</label>
          <div className="range-inputs">
            <input 
              type="number" 
              name="minPrice" 
              placeholder="Min" 
              value={filters.minPrice}
              onChange={handleChange}
            />
            <span>-</span>
            <input 
              type="number" 
              name="maxPrice" 
              placeholder="Max" 
              value={filters.maxPrice}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="filter-group">
          <label>Rooms</label>
          <div className="range-inputs">
            <input 
              type="number" 
              name="minRooms" 
              placeholder="Min" 
              step="0.5"
              value={filters.minRooms}
              onChange={handleChange}
            />
            <span>-</span>
            <input 
              type="number" 
              name="maxRooms" 
              placeholder="Max" 
              step="0.5"
              value={filters.maxRooms}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="filter-group">
          <label>Area (m²)</label>
          <div className="range-inputs">
            <input 
              type="number" 
              name="minArea" 
              placeholder="Min" 
              value={filters.minArea}
              onChange={handleChange}
            />
            <span>-</span>
            <input 
              type="number" 
              name="maxArea" 
              placeholder="Max" 
              value={filters.maxArea}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <button type="submit" className="filter-submit-btn">Apply Filters</button>
        <button type="button" className="filter-reset-btn" onClick={() => setFilters({
          propertyType: 'all',
          minPrice: '',
          maxPrice: '',
          minRooms: '',
          maxRooms: '',
          minArea: '',
          maxArea: '',
        })}>
          Reset Filters
        </button>
      </form>
    </div>
  );
};

export default SearchFilters;