const BASE_URL = 'https://script.google.com/macros/s/AKfycbwSISHu8BtdUJmvcZMdv-LJyzU9t-7DzbTvfkfTNVpjli7PVuap12mwzskMXT9OG2r3/exec';

/**
 * Fetches sheet tab names from the proxy endpoint
 * @returns {Promise<Array>} Array of sheet tab names
 */
export async function fetchSheetTabs() {
  try {
    const response = await fetch(`${BASE_URL}?action=getTabs`);
    const rawText = await response.text();
    console.log('Raw response from Apps Script:', rawText);
    const data = JSON.parse(rawText);
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
    const response = await fetch(`${BASE_URL}?action=generatePdf&sheet=${encodeURIComponent(sheetName)}`);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
} 