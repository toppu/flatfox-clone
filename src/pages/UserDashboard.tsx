// pages/UserDashboard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import './UserDashboard.css';

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

interface Search {
  id: number;
  query: string;
  date: string;
}

interface Application {
  id: number;
  property: string;
  address: string;
  status: string;
  date: string;
}

// Mock data for favorites and recent searches
const MOCK_FAVORITES: Property[] = [
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
    id: 4,
    title: "Luxury 4.5 room penthouse with terrace",
    price: 3800,
    location: "Zurich, 8008",
    area: 120,
    rooms: 4.5,
    images: ["/api/placeholder/400/320", "/api/placeholder/400/320"],
    isNew: false,
    isPremium: true
  }
];

const MOCK_SEARCHES: Search[] = [
  { id: 1, query: "Zurich, 2.5 rooms", date: "2025-02-28" },
  { id: 2, query: "Basel, max 2000 CHF", date: "2025-02-25" },
  { id: 3, query: "Lausanne, 3+ rooms", date: "2025-02-20" }
];

const MOCK_APPLICATIONS: Application[] = [
  {
    id: 1,
    property: "Modern 2.5 room apartment",
    address: "Musterstrasse 123, 8005 Zürich",
    status: "Pending",
    date: "2025-02-15"
  },
  {
    id: 2,
    property: "Cozy studio in city center",
    address: "Bahnhofstrasse 45, 8001 Zürich",
    status: "Rejected",
    date: "2025-01-30"
  }
];

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('favorites');
  
  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <div className="user-welcome">
          <p>Welcome back, <strong>Florian Müller</strong></p>
        </div>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          My Favorites
        </button>
        <button 
          className={`tab-btn ${activeTab === 'searches' ? 'active' : ''}`}
          onClick={() => setActiveTab('searches')}
        >
          Recent Searches
        </button>
        <button 
          className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          My Applications
        </button>
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Settings
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'favorites' && (
          <div className="favorites-tab">
            <h2>My Favorite Properties</h2>
            {MOCK_FAVORITES.length > 0 ? (
              <div className="favorites-grid">
                {MOCK_FAVORITES.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>You haven't saved any properties yet.</p>
                <Link to="/search" className="action-btn">Browse Properties</Link>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'searches' && (
          <div className="searches-tab">
            <h2>Recent Searches</h2>
            {MOCK_SEARCHES.length > 0 ? (
              <div className="searches-list">
                {MOCK_SEARCHES.map(search => (
                  <div key={search.id} className="search-item">
                    <div className="search-info">
                      <Link to={`/search?q=${search.query}`} className="search-query">
                        {search.query}
                      </Link>
                      <span className="search-date">{search.date}</span>
                    </div>
                    <div className="search-actions">
                      <button className="save-search-btn">Save Search</button>
                      <button className="delete-search-btn">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No recent searches.</p>
                <Link to="/search" className="action-btn">Start Searching</Link>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'applications' && (
          <div className="applications-tab">
            <h2>My Applications</h2>
            {MOCK_APPLICATIONS.length > 0 ? (
              <div className="applications-list">
                {MOCK_APPLICATIONS.map(application => (
                  <div key={application.id} className="application-item">
                    <div className="application-property">
                      <h3>{application.property}</h3>
                      <p className="application-address">{application.address}</p>
                    </div>
                    <div className="application-details">
                      <span className={`application-status status-${application.status.toLowerCase()}`}>
                        {application.status}
                      </span>
                      <span className="application-date">Applied: {application.date}</span>
                    </div>
                    <div className="application-actions">
                      <button className="view-application-btn">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>You haven't submitted any applications yet.</p>
                <Link to="/search" className="action-btn">Find Properties</Link>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <h2>Profile Settings</h2>
            <div className="profile-section">
              <h3>Personal Information</h3>
              <form className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" value="Florian" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" value="Müller" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value="florian.mueller@example.com" />
                </div>
                
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" value="+41 79 123 45 67" />
                </div>
              </form>
            </div>
            
            <div className="profile-section">
              <h3>Password</h3>
              <form className="password-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" />
                </div>
                
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" />
                </div>
                
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" />
                </div>
                
                <button type="submit" className="save-password-btn">Change Password</button>
              </form>
            </div>
            
            <div className="profile-section">
              <h3>Notification Preferences</h3>
              <div className="notification-options">
                <div className="notification-option">
                  <input type="checkbox" id="emailNotifications" checked />
                  <label htmlFor="emailNotifications">Email notifications for new properties</label>
                </div>
                
                <div className="notification-option">
                  <input type="checkbox" id="applicationUpdates" checked />
                  <label htmlFor="applicationUpdates">Application status updates</label>
                </div>
                
                <div className="notification-option">
                  <input type="checkbox" id="marketingEmails" />
                  <label htmlFor="marketingEmails">Marketing emails and special offers</label>
                </div>
              </div>
              
              <button className="save-profile-btn">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;