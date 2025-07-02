import { useState } from 'react';

export function useEcoPoints() {
  // Placeholder: start with 0 points
  const [ecoPoints, setEcoPoints] = useState(0);

  // Placeholder: add points
  const addPoints = (points: number) => setEcoPoints((prev) => prev + points);

  return { ecoPoints, addPoints };
} 