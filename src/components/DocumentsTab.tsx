import React from 'react';
import type { UploadedFile } from '../types';

interface DocumentsTabProps {
  uploadedFiles: UploadedFile[];
  formatFileSize: (bytes: number) => string;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({ uploadedFiles, formatFileSize }) => {
  return (
    <>
      <style>{`
        .tab-container {
          height: 100%;
          padding: 20px;
          background-color: #f8f9fa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .tab-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 30px;
          color: #333;
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 60vh;
          color: #888;
        }

        .empty-icon {
          width: 100px;
          height: 100px;
          stroke: #ccc;
          margin-bottom: 20px;
        }

        .empty-text {
          font-size: 18px;
          margin: 0;
        }

        /* Table Styles */
        .documents-table-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .documents-table {
          width: 100%;
          border-collapse: collapse;
        }

        .table-header {
          background-color: #f1f3f5;
          text-transform: uppercase;
          font-size: 12px;
          color: #666;
          letter-spacing: 0.5px;
        }

        .table-th,
        .table-td {
          padding: 14px 16px;
          text-align: left;
          border-bottom: 1px solid #e9ecef;
        }

        .table-row:hover {
          background-color: #f9fafb;
        }

        .file-icon {
          width: 32px;
          height: 32px;
          stroke: #999;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .file-name {
          color: #007bff;
          text-decoration: none;
          font-weight: 500;
        }

        .file-name:hover {
          text-decoration: underline;
        }

        .file-name-cell {
          display: flex;
          align-items: center;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tag {
          background-color: #e3f2fd;
          color: #1976d2;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 13px;
        }
      `}</style>

      <div className="tab-container">
        <h2 className="tab-title">All Documents</h2>

        {uploadedFiles.length === 0 ? (
          <div className="empty-state">
            <svg
              className="empty-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
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
              <tbody>
                {uploadedFiles.map((item, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-td">
                      <div className="file-name-cell">
                        <svg
                          className="file-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                        <a
                          href={item.downloadUrl || '#'}
                          className="file-name"
                          download={item.metadata.fileName}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.metadata.fileName}
                        </a>
                      </div>
                    </td>
                    <td className="table-td">{item.metadata.category || '-'}</td>
                    <td className="table-td">{item.metadata.department || '-'}</td>
                    <td className="table-td">{formatFileSize(item.metadata.fileSize)}</td>
                    <td className="table-td">
                      <div className="tags-container">
                        {item.metadata.tags?.length > 0 ? (
                          item.metadata.tags.map((tag: string, tagIndex: number) => (
                            <span key={tagIndex} className="tag">
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span style={{ color: '#aaa', fontStyle: 'italic' }}>No tags</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default DocumentsTab;