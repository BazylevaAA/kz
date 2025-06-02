import { useState, useCallback } from 'react';
import './FileUploader.css';

function FileUploader({ onUpload, accept, isLoading }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (accept && !droppedFile.name.endsWith(accept.replace('*', ''))) {
        alert(`Please upload a ${accept} file`);
        return;
      }
      setFile(droppedFile);
    }
  }, [accept]);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="file-uploader-container">
      <div 
        className={`dropzone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          id="file-upload"
          accept={accept}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload" className="file-upload-label">
          {file ? (
            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-size">{(file.size / 1024).toFixed(2)} KB</span>
            </div>
          ) : (
            <>
              <div className="upload-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <p className="dropzone-text">Drag & drop your file here or click to browse</p>
              {accept && <p className="file-types">Supported format: {accept}</p>}
            </>
          )}
        </label>
      </div>

      {file && (
        <button 
          className="upload-button"
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Uploading...
            </>
          ) : 'Upload File'}
        </button>
      )}
    </div>
  );
}

export default FileUploader;