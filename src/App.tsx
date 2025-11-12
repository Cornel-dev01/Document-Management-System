import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/styles/App.css';
import Sidebar from './components/pages/Sidebar';
import UploadContent from './components/pages/UploadContent';
import AllDocuments from './components/pages/AllDocuments';
import Folders from './components/pages/Folders';
import Archives from './components/pages/Archives';
import SearchContent from './components/pages/SearchContent';

const App: React.FC = () => {
  return (
    <Router>
      <div className="dms-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/upload" element={<UploadContent />} />
            <Route path="/all" element={<AllDocuments />} />
            <Route path="/folders" element={<Folders />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/search" element={<SearchContent />} />
            <Route path="*" element={<UploadContent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;