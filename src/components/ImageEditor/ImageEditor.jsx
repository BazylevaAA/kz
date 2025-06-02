import { useState } from 'react';
import ImagePreview from './ImagePreview';
import './ImageEditor.css';

// Импортируем изображения
import DefaultTextureImage from './MocPhoto/DefaultTextureImage.png';
import HighRadarDown from './MocPhoto/high_radar_down.png';
import PopSettingBgNight from './MocPhoto/pop_setting_bg_night.png';

function ImageEditor() {
  const [images, setImages] = useState([
    {
      id: 'img1',
      name: 'pop_setting_bg_night.png',
      previewUrl: PopSettingBgNight,
      originalUrl: PopSettingBgNight,
      modified: false
    },
    {
      id: 'img2',
      name: 'high_radar_down.png',
      previewUrl: HighRadarDown,
      originalUrl: HighRadarDown,
      modified: false
    },
    {
      id: 'img3',
      name: 'DefaultTextureImage.png',
      previewUrl: DefaultTextureImage,
      originalUrl: DefaultTextureImage,
      modified: false
    }
  ]);

  const handleReplaceImage = (imageId, newFile) => {
    setImages(images.map(img => {
      if (img.id === imageId) {
        const newPreviewUrl = URL.createObjectURL(newFile);
        return {
          ...img,
          previewUrl: newPreviewUrl,
          modified: true
        };
      }
      return img;
    }));
  };

  const handleDownload = (imageUrl, imageName) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="image-editor">
      <div className="image-grid">
        {images.map(image => (
          <ImagePreview
            key={image.id}
            image={image}
            onReplace={(file) => handleReplaceImage(image.id, file)}
            onDownload={() => handleDownload(image.originalUrl, image.name)}
            isModified={image.modified}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageEditor;