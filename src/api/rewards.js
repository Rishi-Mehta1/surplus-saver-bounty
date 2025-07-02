// Mock API for Eco Points and rewards
export async function fetchEcoPoints(userId) {
  // Placeholder: return a fixed number
  return 1200;
}

export async function fetchRewards() {
  // Placeholder: return mock rewards
  return [
    { id: 1, name: 'Free Surprise Bag', points: 1000 },
    { id: 2, name: '5% Off Coupon', points: 500 },
  ];
} 