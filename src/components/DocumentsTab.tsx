import React from 'react';
import type { UploadedFile } from '../types';

interface DocumentsTabProps {
  uploadedFiles: UploadedFile[];
  formatFileSize: (bytes: number) => string;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({ uploadedFiles, formatFileSize }) => {
  return (
    <div className="tab-container">
      <div className="tab-content">
        <h2 className="tab-title">All Documents</h2>
        {uploadedFiles.length === 0 ? (
          <div className="empty-state">
            {/* File icon SVG */}
            <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="empty-text">No documents uploaded yet</p>
          </div>
        ) : (
          <div className="documents-table-container">
            <table className="documents-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">Name</th>
                  <th className="table-th">Category</th>
                  <th className="table-th">Department</th>
                  <th className="table-th">Size</th>
                  <th className="table-th">Tags</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {uploadedFiles.map((item, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-td">
                      <div className="flex items-center">
                        {/* File icon */}
                        <svg className="file-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="file-name">{item.metadata.fileName}</span>
                      </div>
                    </td>
                    <td className="table-td">{item.metadata.category}</td>
                    <td className="table-td">{item.metadata.department}</td>
                    <td className="table-td">{formatFileSize(item.metadata.fileSize)}</td>
                    <td className="table-td">
                      <div className="tags-container">
                        {item.metadata.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="tag">{tag}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsTab;