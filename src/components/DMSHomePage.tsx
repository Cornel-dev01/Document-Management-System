import React, { useState } from "react";
import Sidebar from "./Sidebar";
import UploadTab from "./UploadTab";
import DocumentsTab from "./DocumentsTab";
import FoldersTab from "./FoldersTab";
import SearchTab from "./SearchTab";
import SettingsTab from "./SettingsTab";
import MetadataModal from "./MetadataModal";
import type { DocumentMetadata, UploadedFile } from "../types";
import "./styles/styles.css";

const DMSHomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [metadata, setMetadata] = useState<DocumentMetadata>({
    fileName: "",
    fileType: "",
    fileSize: 0,
    category: "",
    tags: [],
    description: "",
    department: "",
    confidentiality: "public",
  });

  const [currentTag, setCurrentTag] = useState("");

  const categories = [
    "Contract",
    "Invoice",
    "Report",
    "Presentation",
    "Spreadsheet",
    "Legal Document",
    "HR Document",
    "Marketing Material",
    "Other",
  ];
  const departments = [
    "Finance",
    "Human Resources",
    "Legal",
    "Marketing",
    "Operations",
    "Sales",
    "IT",
    "Executive",
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMetadata({
        ...metadata,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });
      setShowMetadataModal(true);
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !metadata.tags.includes(currentTag.trim())) {
      setMetadata({
        ...metadata,
        tags: [...metadata.tags, currentTag.trim()],
      });
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setMetadata({
      ...metadata,
      tags: metadata.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleUpload = () => {
    if (!selectedFile || !metadata.category || !metadata.department) {
      alert("Please fill in all required fields (Category and Department)");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setShowMetadataModal(false);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("metadata", JSON.stringify(metadata));

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    // WHEN UPLOAD FINISHES (SUCCESS OR ERROR)
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Success!
        setUploadProgress(100);

        try {
          const result = JSON.parse(xhr.responseText);

          setTimeout(() => {
            setUploadedFiles([
              ...uploadedFiles,
              { file: selectedFile, metadata },
            ]);
            setIsUploading(false);
            setUploadProgress(0);
            setSelectedFile(null);
            setMetadata({
              fileName: "",
              fileType: "",
              fileSize: 0,
              category: "",
              tags: [],
              description: "",
              department: "",
              confidentiality: "public",
            });
            alert("File uploaded successfully to MinIO!");
          }, 300);
        } catch (e) {
          alert("Uploaded! (Response not JSON, but file is saved)");
          // Still success even if backend returns plain text
          setTimeout(() => {
            setUploadedFiles([
              ...uploadedFiles,
              { file: selectedFile, metadata },
            ]);
            setIsUploading(false);
            setUploadProgress(0);
          }, 300);
        }
      } else {
        // Server error
        setIsUploading(false);
        setUploadProgress(0);
        try {
          const error = JSON.parse(xhr.responseText);
          alert("Upload failed: " + (error.detail || "Server error"));
        } catch {
          alert("Upload failed: HTTP " + xhr.status);
        }
      }
    };

    // NETWORK ERROR (e.g. FastAPI not running)
    xhr.onerror = () => {
      setIsUploading(false);
      setUploadProgress(0);
      alert(
        "Network error — Is your backend running on http://localhost:8000?"
      );
    };

    xhr.ontimeout = () => {
      setIsUploading(false);
      setUploadProgress(0);
      alert("Upload timed out");
    };

    // Start the upload
    xhr.open("POST", "http://localhost:8000/upload");
    xhr.timeout = 300000; 
    xhr.send(formData);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return (
          <UploadTab
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            handleFileSelect={handleFileSelect}
            uploadedFiles={uploadedFiles}
            formatFileSize={formatFileSize}
          />
        );
      case "documents":
        return (
          <DocumentsTab
            uploadedFiles={uploadedFiles}
            formatFileSize={formatFileSize}
          />
        );
      case "folders":
        return <FoldersTab />;
      case "search":
        return <SearchTab />;
      case "settings":
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
