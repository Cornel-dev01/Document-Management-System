import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Upload, FileText, Settings, Search, FolderOpen, Archive } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      {/* Fixed Top Section - Always Visible */}
      <div className="sidebar-top">
        <div className="logo-area">[Logo Area]</div>
        
        <nav className="nav-menu">
          <Link 
            to="/upload" 
            className={`nav-item ${location.pathname === '/upload' ? 'active' : ''}`}
          >
            <Upload size={18} />
            <span>Upload Documents</span>
          </Link>
          <Link 
            to="/all" 
            className={`nav-item ${location.pathname === '/all' ? 'active' : ''}`}
          >
            <FileText size={18} />
            <span>All Documents</span>
          </Link>
          <Link 
            to="/folders" 
            className={`nav-item ${location.pathname === '/folders' ? 'active' : ''}`}
          >
            <FolderOpen size={18} />
            <span>Folders</span>
          </Link>
          <Link 
            to="/archives" 
            className={`nav-item ${location.pathname === '/archives' ? 'active' : ''}`}
          >
            <Archive size={18} />
            <span>Archives</span>
          </Link>
          <Link 
            to="/search" 
            className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}
          >
            <Search size={18} />
            <span>Search</span>
          </Link>
        </nav>
      </div>

      {/* Fixed Bottom Section - Always Visible */}
      <div className="sidebar-bottom">
        <button className="settings-btn">
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;