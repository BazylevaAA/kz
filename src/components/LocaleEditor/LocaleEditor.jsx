import { useState, useEffect } from 'react';
import LocaleTable from './LocaleTable';
import Button from '../common/Button';
import './LocaleEditor.css';

function LocaleEditor() {
  const [locales, setLocales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchLocales = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        // Mock data
        const mockLocales = Array.from({ length: 50 }, (_, i) => ({
          id: `TC_FuelEnd_${i}`,
          original: i % 3 === 0 ? '燃油补电结束' : i % 2 === 0 ? '发动机启动' : '系统故障',
          newValue: '',
          modified: false
        }));
        setLocales(mockLocales);
      } catch (error) {
        console.error('Failed to load locales:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocales();
  }, []);

  const handleStringChange = (id, value) => {
    setLocales(locales.map(locale => 
      locale.id === id 
        ? { ...locale, newValue: value, modified: value !== locale.original } 
        : locale
    ));
  };

  const handleSave = () => {
    const modifiedLocales = locales.filter(locale => locale.modified);
    console.log('Saving modified locales:', modifiedLocales);
    alert(`Saved ${modifiedLocales.length} changes`);
  };

  const filteredLocales = locales.filter(locale =>
    locale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    locale.original.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="locale-editor">
      <div className="locale-controls">
        <input
          type="text"
          placeholder="Search strings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Button 
          onClick={handleSave}
          variant="primary"
          disabled={!locales.some(locale => locale.modified)}
        >
          Save Changes
        </Button>
      </div>

      {isLoading ? (
        <div className="loading-indicator">Loading locales...</div>
      ) : (
        <LocaleTable 
          locales={filteredLocales} 
          onStringChange={handleStringChange} 
        />
      )}
    </div>
  );
}

export default LocaleEditor;