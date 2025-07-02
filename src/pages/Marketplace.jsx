import React, { useEffect, useState } from 'react';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { fetchSurplusItems } from '../api/surplus';
import SurpriseBagList from '../components/Marketplace/SurpriseBagList';
import { ShoppingBag } from 'lucide-react';

const Marketplace = () => {
  const location = useGeoLocation();
  const [bags, setBags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location) {
      setLoading(true);
      fetchSurplusItems(location).then((data) => {
        setBags(data);
        setLoading(false);
      });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-100 py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="flex justify-center mb-4">
          <ShoppingBag className="w-14 h-14 text-green-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Marketplace</h1>
        <p className="text-lg text-gray-600 mb-2">Discover discounted surprise bags from nearby Walmart stores. Save food, save money, save the planet!</p>
      </div>
      {/* Bag Grid */}
      <div className="max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center text-lg text-gray-500 py-20">Loading nearby surprise bags...</div>
        ) : (
          <SurpriseBagList bags={bags} />
        )}
      </div>
    </div>
  );
};

export default Marketplace; 