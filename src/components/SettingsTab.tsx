import React from 'react';

const SettingsTab: React.FC = () => {
  return (
    <div className="tab-container">
      <div className="tab-content">
        <h2 className="tab-title">Settings</h2>
        <div className="empty-state">
          {/* Settings icon SVG */}
          <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2v2m0-2V4m0 14v2m0-2v-2m0 2v2m-6-8H4m2 0h2m-2 0H4m14 0h2m-2 0h-2m2 0h2M5.636 18.364l-1.414 1.414m2.828-2.828l-1.414 1.414m14.142-2.828l1.414 1.414m-2.828-2.828l1.414 1.414M18.364 5.636l1.414-1.414m-2.828 2.828l1.414-1.414M5.636 5.636l-1.414-1.414m2.828 2.828l-1.414-1.414" />
          </svg>
          <p className="empty-text">Settings configuration coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;