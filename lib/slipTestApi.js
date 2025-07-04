const BASE_URL = 'https://script.google.com/macros/s/AKfycbw6FgXt-ms8goLGypgtikq2DxUdjCPL-ps-Tf18Eybkbmob3wKYjwafMMWqIzjjBopJ/exec';
const API_KEY = 'slip-test-access-2025';

/**
 * Fetches sheet tab names from the Apps Script endpoint
 * @returns {Promise<Array>} Array of sheet tab names
 */
export async function fetchSheetTabs() {
  try {
    const response = await fetch(`${BASE_URL}?action=list&key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.tabs || [];
  } catch (error) {
    console.error('Error fetching sheet tabs:', error);
    throw error;
  }
}

/**
 * Triggers PDF generation for a specific tab
 * @param {string} sheetName - The name of the sheet tab
 * @returns {Promise<string>} Success or error message
 */
export async function generatePdf(sheetName) {
  try {
    const response = await fetch(`${BASE_URL}?action=generate&sheet=${encodeURIComponent(sheetName)}&key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.text();
    return result;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
} 