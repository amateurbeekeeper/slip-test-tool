export async function GET() {
  // Hardcoded items for the dropdown
  const items = [
    { id: 1, name: "Test Report 1", description: "First test report" },
    { id: 2, name: "Test Report 2", description: "Second test report" },
    { id: 3, name: "Test Report 3", description: "Third test report" },
    { id: 4, name: "Performance Report", description: "Performance analysis" },
    { id: 5, name: "Security Report", description: "Security assessment" },
  ];

  return Response.json({ items });
} 