import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from '../components/FileUploader/FileUploader';
import './HomePage.css';

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Здесь будет вызов API для загрузки файла
      // Пока просто симуляция загрузки
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // После успешной загрузки переходим на страницу редактора
      navigate('/editor', { state: { fileName: file.name } });
    } catch (err) {
      setError('Failed to upload file. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="home-page-container">
        <h1>KZB File Editor</h1>
        <p className="description">
          Upload your KZB file to edit localized strings and images
        </p>
        
        <FileUploader 
          onUpload={handleFileUpload} 
          accept=".kzb"
          isLoading={isLoading}
        />
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="recent-files">
          <h3>Recent Files</h3>
          {/* Здесь можно добавить список недавних файлов */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;