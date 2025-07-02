// Mock API for surplus items
export async function fetchSurplusItems(location) {
  // location: {lat, lng}
  // Return mock data
  return [
    {
      id: 1,
      store: 'Walmart Supercenter',
      items: 'Bakery & Dairy Mix',
      price: 5.00,
      originalPrice: 15.00,
      discount: 67,
      expiry: '2025-01-10T20:00:00Z',
    },
    {
      id: 2,
      store: 'Walmart Neighborhood Market',
      items: 'Fresh Produce Box',
      price: 6.00,
      originalPrice: 20.00,
      discount: 70,
      expiry: '2025-01-10T21:00:00Z',
    },
  ];
} 