import React, { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Upload, X, Check, File, ChevronDown } from 'lucide-react';

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: 'waiting' | 'uploading' | 'complete';
  /** NEW – metadata entered by the user */
  meta: {
    title: string;
    type: string;
    department: string;
    keywords: string;
    retentionYears: string;
  };
}

// Define props type for clarity
interface MetadataFormProps {
  file: File;
  onSubmit: (meta: UploadFile['meta']) => void;
  onCancel: () => void;
}

// Helper to get initial metadata
const getInitialMeta = (file: File): UploadFile['meta'] => ({
  title: file.name.replace(/\.[^/.]+$/, ''),
  type: '',
  department: '',
  keywords: '',
  retentionYears: '',
});

const MetadataForm: React.FC<MetadataFormProps> = ({ file, onSubmit, onCancel }) => {
  const [meta, setMeta] = useState<UploadFile['meta']>(getInitialMeta(file));

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMeta((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!meta.title || !meta.type || !meta.department) {
      alert('Please fill Title, Type and Department');
      return;
    }
    onSubmit(meta);
  };

  return (
    <div className="metadata-panel">
      <div className="metadata-header">
        <File className="file-icon" size={20} />
        <span className="file-name">{file.name}</span>
        <button className="close-btn" onClick={onCancel}>
          <X size={18} />
        </button>
      </div>

      <div className="metadata-fields">
        <label>
          Title *
          <input
            name="title"
            value={meta.title}
            onChange={handleChange}
            placeholder="e.g. Q3 Financial Report"
          />
        </label>

        <label>
          Document Type *
          <select name="type" value={meta.type} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option>Contract</option>
            <option>Invoice</option>
            <option>Report</option>
            <option>Policy</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          Department *
          <select name="department" value={meta.department} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option>Finance</option>
            <option>HR</option>
            <option>Legal</option>
            <option>IT</option>
            <option>Marketing</option>
          </select>
        </label>

        <label>
          Keywords (comma separated)
          <input
            name="keywords"
            value={meta.keywords}
            onChange={handleChange}
            placeholder="Q3, revenue, profit"
          />
        </label>

        <label>
          Retention (years)
          <input
            name="retentionYears"
            type="number"
            min="1"
            value={meta.retentionYears}
            onChange={handleChange}
            placeholder="7"
          />
        </label>
      </div>

      <div className="metadata-actions">
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button className="add-queue-btn" onClick={handleAdd}>
          Add to Queue
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                    */
/* ------------------------------------------------------------------ */
const UploadContent: React.FC = () => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* NEW – state for the temporary file that is waiting for metadata */
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  /* ---------------------------------------------------------------- */
  /*  File selection (browse button)                                   */
  /* ---------------------------------------------------------------- */
  const handleBrowseClick = () => fileInputRef.current?.click();

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPendingFile(e.target.files[0]); // show metadata form for the first file
      e.target.value = ''; // allow same file again
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Add file + metadata to the queue                                 */
  /* ---------------------------------------------------------------- */
  const addFileWithMeta = (file: File, meta: UploadFile['meta']) => {
    const uploadFile: UploadFile = {
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      progress: 0,
      status: 'waiting',
      meta,
    };

    setUploadFiles((prev) => [...prev, uploadFile]);
    simulateUpload(uploadFile.id);
    setPendingFile(null); // hide form
  };

  /* ---------------------------------------------------------------- */
  /*  Simulated upload (unchanged)                                      */
  /* ---------------------------------------------------------------- */
  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: 100, status: 'complete' } : f
          )
        );
      } else {
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress, status: 'uploading' } : f
          )
        );
      }
    }, 300);
  };

  const removeFile = (fileId: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const clearAll = () => setUploadFiles([]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  /* ---------------------------------------------------------------- */
  /*  RENDER                                                            */
  /* ---------------------------------------------------------------- */
  return (
    <>
      <header className="header">
        <h1>Document Management System</h1>
        <p className="subtitle">Upload Process</p>
      </header>

      <div className="upload-section">
        <div className="upload-header">
          <h2>Document Upload</h2>
          <span className="step-indicator">Step 1 of 1</span>
        </div>

        {/* ---------------------------------------------------------- */}
        {/*  NEW – compact upload button + optional metadata panel      */}
        {/* ---------------------------------------------------------- */}
        <div className="upload-area">
          {/* ---- Browse button (always visible) ---- */}
          <button className="browse-btn compact" onClick={handleBrowseClick}>
            <Upload size={20} />
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInput}
            style={{ display: 'none' }}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          />
          <p className="supported-formats compact">
            PDF, DOC/DOCX, XLS/XLSX, JPG, PNG (max 25 MB)
          </p>

          {/* ---- Metadata form (shows only while a file is pending) ---- */}
          {pendingFile && (
            <MetadataForm
              file={pendingFile}
              onSubmit={(meta) => addFileWithMeta(pendingFile, meta)}
              onCancel={() => setPendingFile(null)}
            />
          )}
        </div>

        {/* ---------------------------------------------------------- */}
        {/*  Queue (now shows title + tooltip with extra metadata)      */}
        {/* ---------------------------------------------------------- */}
        {uploadFiles.length > 0 && (
          <div className="upload-queue">
            <h3>Upload Queue ({uploadFiles.length})</h3>

            <div className="file-list">
              {uploadFiles.map((uf) => (
                <div key={uf.id} className="file-item">
                  <File className="file-icon" size={32} />

                  <div className="file-info">
                    <div className="file-header">
                      {/* Show user-entered title */}
                      <span className="file-name" title={uf.file.name}>
                        {uf.meta.title}
                      </span>
                      {uf.status === 'complete' && (
                        <Check className="check-icon" size={18} />
                      )}
                    </div>

                    <div className="file-size">
                      {formatFileSize(uf.file.size)}
                    </div>

                    {/* Tooltip with the rest of the metadata */}
                    <div
                      className="metadata-tooltip"
                      title={`Type: ${uf.meta.type}
                        Department: ${uf.meta.department}
                        Keywords: ${uf.meta.keywords || '-'}
                        Retention: ${uf.meta.retentionYears || '-'} years`}
                    >
                      <ChevronDown size={14} />
                    </div>

                    {uf.status === 'uploading' && (
                      <div className="progress-container">
                        <div
                          className="progress-bar"
                          style={{ width: `${uf.progress}%` }}
                        />
                      </div>
                    )}

                    <div className="file-status">
                      {uf.status === 'complete' && (
                        <span className="status-complete">Upload complete</span>
                      )}
                      {uf.status === 'uploading' && (
                        <span className="status-uploading">
                          {Math.round(uf.progress)}% uploaded
                        </span>
                      )}
                      {uf.status === 'waiting' && (
                        <span className="status-waiting">Waiting…</span>
                      )}
                    </div>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFile(uf.id)}
                    aria-label="Remove file"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="queue-actions">
              <button className="clear-btn" onClick={clearAll}>
                Clear All
              </button>
              <div className="action-buttons">
                <button className="cancel-btn">Cancel</button>
                <button className="metadata-btn">Add Metadata to Queue</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadContent;