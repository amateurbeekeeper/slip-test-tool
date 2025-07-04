'use client';

import { useState, useEffect } from 'react';
import styles from "./page.module.css";

export default function Home() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch items from API
    fetch('/api/items')
      .then(res => res.json())
      .then(data => setItems(data.items))
      .catch(err => console.error('Error fetching items:', err));
  }, []);

  const handleGeneratePDF = async () => {
    if (!selectedItem) {
      setMessage('Please select an item first');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: selectedItem }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage(data.message);
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (error) {
      setMessage('Error generating PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>PDF Generator</h1>
        
        <div className={styles.container}>
          <div className={styles.formGroup}>
            <label htmlFor="itemSelect" className={styles.label}>
              Select an item:
            </label>
            <select
              id="itemSelect"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className={styles.select}
            >
              <option value="">Choose an item...</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.description}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGeneratePDF}
            disabled={!selectedItem || loading}
            className={styles.button}
          >
            {loading ? 'Generating PDF...' : 'Generate PDF'}
          </button>

          {message && (
            <div className={styles.message}>
              {message}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
