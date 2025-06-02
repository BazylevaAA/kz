import { useState } from 'react';
import './ImageEditor.css';

function ImagePreview({ image, onReplace, onDownload, isModified }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onReplace(file);
    }
    e.target.value = ''; // Сброс input для возможности загрузки того же файла
  };

  return (
    <div className={`image-preview-container ${isModified ? 'modified' : ''}`}>
      <div 
        className="image-thumbnail"
        onClick={() => setIsModalOpen(true)}
      >
        <img src={image.previewUrl} alt={image.name} />
        {isModified && <div className="modified-badge">Modified</div>}
      </div>
      
      <div className="image-info">
        <span className="image-name">{image.name}</span>
      </div>
      
      <div className="image-actions">
        <button onClick={onDownload}>Download</button>
        <label className="replace-button">
          Replace
          <input 
            type="file" 
            accept="image/png, image/jpeg" 
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {isModalOpen && (
        <div className="image-modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={image.previewUrl} alt={image.name} />
            <button 
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagePreview;