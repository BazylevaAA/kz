import { useMemo } from 'react';
import './LocaleEditor.css';

function LocaleTable({ locales, onStringChange }) {
  const hasModified = useMemo(() => locales.some(locale => locale.modified), [locales]);

  if (locales.length === 0) {
    return <div className="no-results">No matching strings found</div>;
  }

  return (
    <div className="locale-table-container">
      <table className="locale-table">
        <thead>
          <tr>
            <th width="30%">ID</th>
            <th width="30%">Original Value</th>
            <th width="30%">New Value</th>
            <th width="10%">Status</th>
          </tr>
        </thead>
        <tbody>
          {locales.map(locale => (
            <tr key={locale.id} className={locale.modified ? 'modified' : ''}>
              <td className="locale-id">{locale.id}</td>
              <td className="original-value">{locale.original}</td>
              <td>
                <input
                  type="text"
                  value={locale.newValue}
                  onChange={(e) => onStringChange(locale.id, e.target.value)}
                  placeholder="Enter translation..."
                  className="new-value-input"
                />
              </td>
              <td className="status-cell">
                {locale.modified && (
                  <span className="modified-badge">Modified</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasModified && (
        <div className="modified-count">
          {locales.filter(locale => locale.modified).length} strings modified
        </div>
      )}
    </div>
  );
}

export default LocaleTable;