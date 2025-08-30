// import React, { useCallback, useState } from 'react';
// import { Upload, FileText, X } from 'lucide-react';

// interface FileUploadProps {
//   onFileUpload: (file: File) => void;
//   isAnalyzing: boolean;
// }

// const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isAnalyzing }) => {
//   const [dragActive, setDragActive] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);

//   const handleDrag = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   }, []);

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0];
//       if (isValidFileType(file)) {
//         setUploadedFile(file);
//         onFileUpload(file);
//       }
//     }
//   }, [onFileUpload]);

//   const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       if (isValidFileType(file)) {
//         setUploadedFile(file);
//         onFileUpload(file);
//       }
//     }
//   }, [onFileUpload]);

//   const isValidFileType = (file: File) => {
//     const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
//     return validTypes.includes(file.type);
//   };

//   const removeFile = () => {
//     setUploadedFile(null);
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//       <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Project Proposal</h2>
      
//       {!uploadedFile ? (
//         <div
//           className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
//             dragActive
//               ? 'border-blue-500 bg-blue-50'
//               : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
//           } ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}`}
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <Upload className={`mx-auto h-12 w-12 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
//           <div className="mt-4">
//             <p className="text-lg font-medium text-gray-900">
//               {dragActive ? 'Drop your file here' : 'Drag and drop your file here'}
//             </p>
//             <p className="text-sm text-gray-600 mt-2">
//               or{' '}
//               <label className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
//                 browse to upload
//                 <input
//                   type="file"
//                   className="hidden"
//                   accept=".pdf,.docx,.txt"
//                   onChange={handleFileSelect}
//                   disabled={isAnalyzing}
//                 />
//               </label>
//             </p>
//             <p className="text-xs text-gray-500 mt-3">
//               Supports PDF, DOCX, and TXT files up to 10MB
//             </p>
//           </div>
//         </div>
//       ) : (
//         <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <FileText className="w-8 h-8 text-blue-600" />
//               <div>
//                 <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
//                 <p className="text-xs text-gray-600">{formatFileSize(uploadedFile.size)}</p>
//               </div>
//             </div>
//             {!isAnalyzing && (
//               <button
//                 onClick={removeFile}
//                 className="p-1 hover:bg-gray-200 rounded transition-colors"
//               >
//                 <X className="w-4 h-4 text-gray-500" />
//               </button>
//             )}
//           </div>
//           {isAnalyzing && (
//             <div className="mt-3">
//               <div className="flex items-center space-x-2">
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
//                 <span className="text-sm text-blue-600">Analyzing your idea...</span>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;



import React, { useCallback, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { PipelineResult } from "../types/pipeline";

interface FileUploadProps {
  onFileUpload?: (file: File) => void;
  onResult?: (result: PipelineResult) => void;
  isAnalyzing?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, onResult, isAnalyzing: parentAnalyzing = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && isValidFileType(file)) {
      setUploadedFile(file);
      if (onFileUpload) onFileUpload(file);
      uploadFile(file);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFileType(file)) {
      setUploadedFile(file);
      if (onFileUpload) onFileUpload(file);
      uploadFile(file);
    }
  }, [onFileUpload]);

  const isValidFileType = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    return validTypes.includes(file.type);
  };

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", "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");

      const response = await fetch("http://127.0.0.1:8000/run-pipeline", {
        method: "POST",
        body: formData,
      });

      const result: PipelineResult = await response.json();
      // Ensure backend arrays are mapped correctly
      const normalizedResult: PipelineResult = {
        scores: Array.isArray(result.scores) ? result.scores : [],
        suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
        competitors: Array.isArray(result.competitors) ? result.competitors : [],
        error: result.error,
      };

      onResult?.(normalizedResult);
    } catch (error) {
      console.error("Error uploading file:", error);
      onResult?.({ scores: [], suggestions: [], competitors: [], error: "Upload failed" });
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    onResult?.({ scores: [], suggestions: [], competitors: [] } as PipelineResult);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  const analyzing = parentAnalyzing;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Project Proposal</h2>

      {!uploadedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          } ${analyzing ? "opacity-50 pointer-events-none" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className={`mx-auto h-12 w-12 ${dragActive ? "text-blue-500" : "text-gray-400"}`} />
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-900">
              {dragActive ? "Drop your file here" : "Drag and drop your file here"}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              or{" "}
              <label className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                browse to upload
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileSelect}
                  disabled={analyzing}
                />
              </label>
            </p>
            <p className="text-xs text-gray-500 mt-3">Supports PDF, DOCX, and TXT files up to 10MB</p>
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                <p className="text-xs text-gray-600">{formatFileSize(uploadedFile.size)}</p>
              </div>
            </div>
            {!analyzing && (
              <button onClick={removeFile} className="p-1 hover:bg-gray-200 rounded transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
          {analyzing && (
            <div className="mt-3 flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-blue-600">Analyzing your idea...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;



