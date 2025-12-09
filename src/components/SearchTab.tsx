// SearchTab.tsx
import React from 'react';

const SearchTab: React.FC = () => {
  return (
    <div className="tab-container">
      <div className="tab-content">
        <h2 className="tab-title">Search Documents</h2>
        <div className="search-card">
          <div className="search-input-container">
            {/* Search icon SVG */}
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by filename, category, tags..."
              className="search-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTab;