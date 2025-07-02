// Mock API for dashboard metrics
export async function fetchMetrics() {
  return {
    revenue: 2500,
    wasteReduced: 320, // in kg
    co2Saved: 120, // in kg
    bagsRescued: 85,
  };
} 