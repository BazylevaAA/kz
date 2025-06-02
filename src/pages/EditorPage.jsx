import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ImageEditor from '../components/ImageEditor/ImageEditor';
import LocaleEditor from '../components/LocaleEditor/LocaleEditor';
import './EditorPage.css';

function EditorPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('locales');
  const [fileName, setFileName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (location.state?.fileName) {
      setFileName(location.state.fileName);
    }
  }, [location]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Здесь будет логика сохранения изменений
      await new Promise(resolve => setTimeout(resolve, 500));
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="editor-page">
      <header className="editor-header">
        <h2>Editing: {fileName || 'Untitled'}</h2>
        <button 
          className="save-button" 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </header>

      <div className="editor-tabs">
        <button
          className={`tab-button ${activeTab === 'locales' ? 'active' : ''}`}
          onClick={() => setActiveTab('locales')}
        >
          Localization Strings
        </button>
        <button
          className={`tab-button ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          Images
        </button>
      </div>

      <div className="editor-content">
        {activeTab === 'locales' ? (
          <LocaleEditor />
        ) : (
          <ImageEditor />
        )}
      </div>
    </div>
  );
}

export default EditorPage;