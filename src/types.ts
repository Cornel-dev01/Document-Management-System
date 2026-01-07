
export interface DocumentMetadata {
  fileName: string;
  fileType: string;
  fileSize: number;
  category: string;
  tags: string[];
  description: string;
  department: string;
  confidentiality: string;
}

export interface UploadedFile {
  file: File;
  metadata: DocumentMetadata;
  downloadUrl?: string;
}