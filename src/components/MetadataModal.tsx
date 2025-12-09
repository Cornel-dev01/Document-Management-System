import React from 'react';
import type { DocumentMetadata } from '../types';

interface MetadataModalProps {
  showMetadataModal: boolean;
  setShowMetadataModal: (show: boolean) => void;
  metadata: DocumentMetadata;
  setMetadata: (metadata: DocumentMetadata) => void;
  currentTag: string;
  setCurrentTag: (tag: string) => void;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
  handleUpload: () => void;
  formatFileSize: (bytes: number) => string;
  categories: string[];
  departments: string[];
}

const MetadataModal: React.FC<MetadataModalProps> = ({
  showMetadataModal,
  setShowMetadataModal,
  metadata,
  setMetadata,
  currentTag,
  setCurrentTag,
  handleAddTag,
  handleRemoveTag,
  handleUpload,
  formatFileSize,
  categories,
  departments,
}) => {
  if (!showMetadataModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Document Details</h3>
          <button
            onClick={() => setShowMetadataModal(false)}
            className="modal-close"
          >
            {/* X icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="close-icon">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">File Name</label>
            <input
              type="text"
              value={metadata.fileName}
              onChange={(e) => setMetadata({ ...metadata, fileName: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              value={metadata.category}
              onChange={(e) => setMetadata({ ...metadata, category: e.target.value })}
              className="form-select"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Department *</label>
            <select
              value={metadata.department}
              onChange={(e) => setMetadata({ ...metadata, department: e.target.value })}
              className="form-select"
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Confidentiality Level</label>
            <select
              value={metadata.confidentiality}
              onChange={(e) => setMetadata({ ...metadata, confidentiality: e.target.value })}
              className="form-select"
            >
              <option value="public">Public</option>
              <option value="internal">Internal</option>
              <option value="confidential">Confidential</option>
              <option value="restricted">Restricted</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Tags</label>
            <div className="tags-input-container">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add a tag"
                className="tags-input"
              />
              <button
                onClick={handleAddTag}
                className="add-tag-button"
              >
                {/* Plus icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="plus-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <div className="tags-list">
              {metadata.tags.map((tag, index) => (
                <span key={index} className="tag-item">
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="remove-tag"
                  >
                    {/* X icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="small-close-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              value={metadata.description}
              onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
              rows={4}
              placeholder="Add a brief description of the document"
              className="form-textarea"
            />
          </div>
          <div className="file-info">
            <p>File Type: {metadata.fileType || 'N/A'}</p>
            <p>File Size: {formatFileSize(metadata.fileSize)}</p>
          </div>
        </div>
        <div className="modal-footer">
          <button
            onClick={() => setShowMetadataModal(false)}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="upload-button"
          >
            Upload Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetadataModal;