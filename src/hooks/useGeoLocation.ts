import { useState, useEffect } from 'react';

export function useGeoLocation() {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Placeholder: use browser geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => setLocation(null)
      );
    }
  }, []);

  return location;
} 