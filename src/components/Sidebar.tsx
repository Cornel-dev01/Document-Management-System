import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Document Management - DMS</h1>
      </div>
      <nav className="sidebar-nav">
        <button
          onClick={() => setActiveTab('upload')}
          className={`sidebar-button ${activeTab === 'upload' ? 'active' : ''}`}
        >
          Upload Documents
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`sidebar-button ${activeTab === 'documents' ? 'active' : ''}`}
        >
          All Documents
        </button>
        <button
          onClick={() => setActiveTab('folders')}
          className={`sidebar-button ${activeTab === 'folders' ? 'active' : ''}`}
        >
          Folders
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`sidebar-button ${activeTab === 'search' ? 'active' : ''}`}
        >
          Search
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`sidebar-button ${activeTab === 'settings' ? 'active' : ''}`}
        >
          Settings
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;