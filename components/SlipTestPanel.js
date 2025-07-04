'use client';

import { useState, useEffect } from 'react';
import { fetchSheetTabs, generatePdf } from '../lib/slipTestApi';

export default function SlipTestPanel() {
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    loadSheetTabs();
  }, []);

  const loadSheetTabs = async () => {
    try {
      setLoading(true);
      const tabNames = await fetchSheetTabs();
      setTabs(tabNames);
    } catch (error) {
      setMessage('Error loading sheet tabs: ' + error.message);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    if (!selectedTab) {
      setMessage('Please select a sheet tab first');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await generatePdf(selectedTab);
      setMessage(result);
      setMessageType(result.toLowerCase().includes('success') ? 'success' : 'error');
    } catch (error) {
      setMessage('Error generating PDF: ' + error.message);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '16px',
        color: '#333'
      }}>
        Slip Test Tool
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label htmlFor="tabSelect" style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px',
            color: '#555'
          }}>
            Select Sheet Tab:
          </label>
          <select
            id="tabSelect"
            value={selectedTab}
            onChange={(e) => setSelectedTab(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: loading ? '#f5f5f5' : 'white'
            }}
            disabled={loading}
          >
            <option value="">Choose a sheet tab...</option>
            {tabs.map((tab, index) => (
              <option key={index} value={tab}>
                {tab}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGeneratePDF}
          disabled={!selectedTab || loading}
          style={{
            width: '100%',
            backgroundColor: !selectedTab || loading ? '#ccc' : '#007bff',
            color: 'white',
            padding: '10px 16px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: !selectedTab || loading ? 'not-allowed' : 'pointer',
            opacity: !selectedTab || loading ? 0.6 : 1
          }}
        >
          {loading ? 'Generating PDF...' : 'Generate PDF'}
        </button>

        {message && (
          <div style={{
            padding: '12px',
            borderRadius: '4px',
            fontSize: '14px',
            backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
            color: messageType === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
} 