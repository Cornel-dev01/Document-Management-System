// Temporary declaration to silence TS module errors for lucide-react
// Remove this file after the package's types are picked up by your editor/TS server
declare module 'lucide-react' {
  import * as React from 'react';
  type LucideProps = React.SVGProps<SVGSVGElement> & { size?: number | string };
  export const Upload: React.FC<LucideProps>;
  export const FileText: React.FC<LucideProps>;
  export const X: React.FC<LucideProps>;
  export const Check: React.FC<LucideProps>;
  export const Settings: React.FC<LucideProps>;
  export const Search: React.FC<LucideProps>;
  export const FolderOpen: React.FC<LucideProps>;
  export const Archive: React.FC<LucideProps>;
  export const File: React.FC<LucideProps>;
  export default {} as Record<string, React.FC<LucideProps>>;
}
