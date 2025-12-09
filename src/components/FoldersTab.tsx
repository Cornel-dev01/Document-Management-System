import React from 'react';

const FoldersTab: React.FC = () => {
  return (
    <div className="tab-container">
      <div className="tab-content">
        <h2 className="tab-title">Folders</h2>
        <div className="empty-state">
          {/* Folder icon SVG */}
          <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <p className="empty-text">Folder organization coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default FoldersTab;