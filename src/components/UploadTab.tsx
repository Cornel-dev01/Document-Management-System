import React from 'react';
import type { UploadedFile } from '../types';

interface UploadTabProps {
  isUploading: boolean;
  uploadProgress: number;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadedFiles: UploadedFile[];
  formatFileSize: (bytes: number) => string;
}

const UploadTab: React.FC<UploadTabProps> = ({
  isUploading,
  uploadProgress,
  handleFileSelect,
  uploadedFiles,
  formatFileSize,
}) => {
  return (
    <div className="upload-container">
     <div className="upload-wrapper">
      <div className="upload-card">
        <h2 className="upload-title">Upload Document</h2>
        <div className="upload-dropzone">
          {/* Replace with SVG or image for upload icon */}
          <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="upload-text">Select a file to upload</p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <label
            htmlFor="file-upload"
            className={`upload-button ${isUploading ? 'disabled' : ''}`}
          >
            {isUploading ? 'Uploading...' : 'Choose File'}
          </label>
        </div>
        {isUploading && (
          <div className="upload-progress">
            <div className="progress-header">
              <span className="progress-label">Uploading document...</span>
              <span className="progress-percentage">{uploadProgress}%</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <div className="progress-spinner">
              {/* Spinner SVG */}
              <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="progress-processing">Processing...</span>
            </div>
          </div>
        )}
        {uploadedFiles.length > 0 && (
          <div className="recent-uploads">
            <h3 className="recent-title">Recently Uploaded</h3>
            <div className="recent-list">
              {uploadedFiles.slice(-3).reverse().map((item, index) => (
                <div key={index} className="recent-item">
                  <div className="recent-info">
                    {/* Replace with file icon SVG */}
                    <svg className="file-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="recent-name">{item.metadata.fileName}</p>
                      <p className="recent-details">{item.metadata.category} • {item.metadata.department}</p>
                    </div>
                  </div>
                  <span className="recent-size">{formatFileSize(item.metadata.fileSize)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
     </div>
    </div>
  );
};

export default UploadTab;