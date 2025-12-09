import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UploadTab from './UploadTab';
import DocumentsTab from './DocumentsTab';
import FoldersTab from './FoldersTab';
import SearchTab from './SearchTab';
import SettingsTab from './SettingsTab';
import MetadataModal from './MetadataModal';
import type { DocumentMetadata, UploadedFile } from '../types';
import './styles/styles.css';

const DMSHomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [metadata, setMetadata] = useState<DocumentMetadata>({
    fileName: '',
    fileType: '',
    fileSize: 0,
    category: '',
    tags: [],
    description: '',
    department: '',
    confidentiality: 'public'
  });

  const [currentTag, setCurrentTag] = useState('');

  const categories = [
    'Contract',
    'Invoice',
    'Report',
    'Presentation',
    'Spreadsheet',
    'Legal Document',
    'HR Document',
    'Marketing Material',
    'Other'
  ];
  const departments = [
    'Finance',
    'Human Resources',
    'Legal',
    'Marketing',
    'Operations',
    'Sales',
    'IT',
    'Executive'
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMetadata({
        ...metadata,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      });
      setShowMetadataModal(true);
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !metadata.tags.includes(currentTag.trim())) {
      setMetadata({
        ...metadata,
        tags: [...metadata.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setMetadata({
      ...metadata,
      tags: metadata.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleUpload = () => {
    if (selectedFile && metadata.category && metadata.department) {
      setIsUploading(true);
      setUploadProgress(0);
      setShowMetadataModal(false);
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Complete the upload
            setTimeout(() => {
              setUploadedFiles([...uploadedFiles, { file: selectedFile, metadata }]);
              setIsUploading(false);
              setUploadProgress(0);
              setSelectedFile(null);
              setMetadata({
                fileName: '',
                fileType: '',
                fileSize: 0,
                category: '',
                tags: [],
                description: '',
                department: '',
                confidentiality: 'public'
              });
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } else {
      alert('Please fill in all required fields (Category and Department)');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'upload':
        return (
          <UploadTab
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            handleFileSelect={handleFileSelect}
            uploadedFiles={uploadedFiles}
            formatFileSize={formatFileSize}
          />
        );
      case 'documents':
        return (
          <DocumentsTab
            uploadedFiles={uploadedFiles}
            formatFileSize={formatFileSize}
          />
        );
      case 'folders':
        return <FoldersTab />;
      case 'search':
        return <SearchTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
      <MetadataModal
        showMetadataModal={showMetadataModal}
        setShowMetadataModal={setShowMetadataModal}
        metadata={metadata}
        setMetadata={setMetadata}
        currentTag={currentTag}
        setCurrentTag={setCurrentTag}
        handleAddTag={handleAddTag}
        handleRemoveTag={handleRemoveTag}
        handleUpload={handleUpload}
        formatFileSize={formatFileSize}
        categories={categories}
        departments={departments}
      />
    </div>
  );
};

export default DMSHomePage;