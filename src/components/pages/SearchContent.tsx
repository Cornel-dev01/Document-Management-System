import React, { useState } from 'react';
import { 
  FileText, 
  X, 
  Search, 
  FolderOpen,  
  Filter,
  Image,
  Table
} from 'lucide-react';

interface Filters {
  fileType: string[];
  dateModified: string;
  size: string;
  owner: string;
  tags: string;
}

const SearchContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('documents');
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState<Filters>({
    fileType: [],
    dateModified: '',
    size: '',
    owner: '',
    tags: ''
  });

  const handleFileTypeChange = (type: string) => {
    setFilters(prev => ({
      ...prev,
      fileType: prev.fileType.includes(type)
        ? prev.fileType.filter(t => t !== type)
        : [...prev.fileType, type]
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      fileType: [],
      dateModified: '',
      size: '',
      owner: '',
      tags: ''
    });
  };

  return (
    <>
      <header className="header">
        <h1>Search Documents</h1>
      </header>

      <div className="search-section">
        <div className="search-bar-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, content, tags, or metadata..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              <X size={18} />
            </button>
          )}
          <button className="search-submit-btn">Search</button>
        </div>

        <div className="search-filters-tabs">
          <button 
            className={`filter-tab ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <FileText size={16} />
            Documents
          </button>
          <button 
            className={`filter-tab ${activeTab === 'folders' ? 'active' : ''}`}
            onClick={() => setActiveTab('folders')}
          >
            <FolderOpen size={16} />
            Folders
          </button>
          <button 
            className={`filter-tab ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            <Image size={16} />
            Images
          </button>
          <button 
            className={`filter-tab ${activeTab === 'spreadsheets' ? 'active' : ''}`}
            onClick={() => setActiveTab('spreadsheets')}
          >
            <Table size={16} />
            Spreadsheets
          </button>
          <button className="more-filters-btn">
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </div>

      <div className="search-content">
        <aside className="filters-sidebar">
          <h3 className="filters-title">Filters</h3>

          <div className="filter-group">
            <h4 className="filter-group-title">File Type</h4>
            <label className="filter-checkbox">
              <input 
                type="checkbox" 
                checked={filters.fileType.includes('all')}
                onChange={() => handleFileTypeChange('all')}
              />
              <span>All Types</span>
            </label>
            <label className="filter-checkbox">
              <input 
                type="checkbox"
                checked={filters.fileType.includes('pdf')}
                onChange={() => handleFileTypeChange('pdf')}
              />
              <span>PDF</span>
            </label>
            <label className="filter-checkbox">
              <input 
                type="checkbox"
                checked={filters.fileType.includes('word')}
                onChange={() => handleFileTypeChange('word')}
              />
              <span>Word</span>
            </label>
            <label className="filter-checkbox">
              <input 
                type="checkbox"
                checked={filters.fileType.includes('excel')}
                onChange={() => handleFileTypeChange('excel')}
              />
              <span>Excel</span>
            </label>
            <label className="filter-checkbox">
              <input 
                type="checkbox"
                checked={filters.fileType.includes('powerpoint')}
                onChange={() => handleFileTypeChange('powerpoint')}
              />
              <span>PowerPoint</span>
            </label>
            <label className="filter-checkbox">
              <input 
                type="checkbox"
                checked={filters.fileType.includes('images')}
                onChange={() => handleFileTypeChange('images')}
              />
              <span>Images</span>
            </label>
          </div>

          <div className="filter-group">
            <h4 className="filter-group-title">Date Modified</h4>
            <label className="filter-radio">
              <input 
                type="radio" 
                name="dateModified"
                checked={filters.dateModified === 'any'}
                onChange={() => setFilters(prev => ({ ...prev, dateModified: 'any' }))}
              />
              <span>Any time</span>
            </label>
            <label className="filter-radio">
              <input 
                type="radio" 
                name="dateModified"
                checked={filters.dateModified === 'today'}
                onChange={() => setFilters(prev => ({ ...prev, dateModified: 'today' }))}
              />
              <span>Today</span>
            </label>
            <label className="filter-radio">
              <input 
                type="radio" 
                name="dateModified"
                checked={filters.dateModified === 'last7'}
                onChange={() => setFilters(prev => ({ ...prev, dateModified: 'last7' }))}
              />
              <span>Last 7 days</span>
            </label>
            <label className="filter-radio">
              <input 
                type="radio" 
                name="dateModified"
                checked={filters.dateModified === 'last30'}
                onChange={() => setFilters(prev => ({ ...prev, dateModified: 'last30' }))}
              />
              <span>Last 30 days</span>
            </label>
            <label className="filter-radio">
              <input 
                type="radio" 
                name="dateModified"
                checked={filters.dateModified === 'lastyear'}
                onChange={() => setFilters(prev => ({ ...prev, dateModified: 'lastyear' }))}
              />
              <span>Last year</span>
            </label>
          </div>

          <div className="filter-group">
            <h4 className="filter-group-title">Size</h4>
            <label className="filter-radio">
              <input 
                type="radio" 
                name="size"
                checked={filters.size === 'any'}
                onChange={() => setFilters(prev => ({ ...prev, size: 'any' }))}
              />
              <span>Any size</span>
            </label>
            <label className="filter-radio">
              <input 
                type="radio" 
                name="size"
                checked={filters.size === 'small'}
                onChange={() => setFilters(prev => ({ ...prev, size: 'small' }))}
              />
              <span>&lt; 1 MB</span>
            </label>
            <label className="filter-radio">
              <input 
                type="radio" 
                name="size"
                checked={filters.size === 'medium'}
                onChange={() => setFilters(prev => ({ ...prev, size: 'medium' }))}
              />
              <span>1-10 MB</span>
            </label>
            <label className="filter-radio">
              <input 
                type="radio" 
                name="size"
                checked={filters.size === 'large'}
                onChange={() => setFilters(prev => ({ ...prev, size: 'large' }))}
              />
              <span>10-100 MB</span>
            </label>
            <label className="filter-radio">
              <input 
                type="radio" 
                name="size"
                checked={filters.size === 'xlarge'}
                onChange={() => setFilters(prev => ({ ...prev, size: 'xlarge' }))}
              />
              <span>&gt; 100 MB</span>
            </label>
          </div>

          <div className="filter-group">
            <h4 className="filter-group-title">Owner</h4>
            <input
              type="text"
              className="filter-input"
              placeholder="Filter by owner..."
              value={filters.owner}
              onChange={(e) => setFilters(prev => ({ ...prev, owner: e.target.value }))}
            />
          </div>

          <div className="filter-group">
            <h4 className="filter-group-title">Tags</h4>
            <input
              type="text"
              className="filter-input"
              placeholder="Filter by tags..."
              value={filters.tags}
              onChange={(e) => setFilters(prev => ({ ...prev, tags: e.target.value }))}
            />
          </div>

          <button className="clear-filters-btn" onClick={handleClearFilters}>
            Clear All Filters
          </button>
        </aside>

        <div className="results-section">
          <div className="results-header">
            <h3 className="results-title">Found 5 results</h3>
            <div className="sort-controls">
              <label className="sort-label">Sort by:</label>
              <select 
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="date-desc">Date (Newest)</option>
                <option value="date-asc">Date (Oldest)</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="size-desc">Size (Largest)</option>
                <option value="size-asc">Size (Smallest)</option>
              </select>
            </div>
          </div>

          <div className="results-list">
            {/* Search results will be displayed here */}
            <p className="no-results">Start searching to see results...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchContent;