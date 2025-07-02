import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, ShoppingBag, Clock } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

// Mock fetch functions (replace with real backend calls)
const fetchStore = async (id) => {
  // Replace with real API call
  return {
    id,
    name: `Walmart Supercenter #${id}`,
    address: '123 Main St, Downtown',
    distance: '0.8 miles',
    bags: 12,
    hours: 'Open until 11:00 PM',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
  };
};
const fetchBags = async (storeId) => {
  // Replace with real API call
  return [
    {
      id: 1,
      category: 'Bakery & Dairy',
      price: 4.00,
      originalPrice: 15.00,
      description: 'Fresh bread, pastries, milk, yogurt, and cheese',
      expiresIn: 2,
      quantity: 3,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      category: 'Fresh Produce',
      price: 6.00,
      originalPrice: 20.00,
      description: 'Seasonal fruits, vegetables, and leafy greens',
      expiresIn: 4,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    },
  ];
};

const BACKEND_URL = 'http://localhost:4000';

const StoreDetail = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [store, setStore] = useState(null);
  const [bags, setBags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const storeData = await fetchStore(id);
      const bagsData = await fetchBags(id);
      setStore(storeData);
      setBags(bagsData);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleReserve = async (bag) => {
    if (!user) {
      setMessage('Please sign in to reserve a bag.');
      return;
    }
    const reservation = {
      ...bag,
      reservedAt: new Date().toISOString(),
      reservedPrice: bag.price,
      store: store.name,
    };
    const res = await fetch(`${BACKEND_URL}/users/${user.id}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation),
    });
    if (res.ok) {
      setMessage('Bag reserved! Check your profile for details.');
    } else {
      setMessage('Failed to reserve bag. Please try again.');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!store) return <div className="min-h-screen flex items-center justify-center">Store not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Store Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-6 md:mb-0">
            <img src={store.image} alt={store.name} className="w-32 h-32 object-cover rounded-lg mr-6" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{store.name}</h1>
              <div className="flex items-center text-gray-600 mb-1">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                <span>{store.address}</span>
                <span className="ml-4">{store.distance} away</span>
              </div>
              <div className="text-gray-500 text-sm">{store.hours}</div>
              <div className="text-yellow-500 mt-1">{'★'.repeat(Math.round(store.rating))} <span className="text-gray-500">({store.rating})</span></div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <ShoppingBag className="w-10 h-10 text-green-600 mb-2" />
            <span className="text-2xl font-bold text-green-600">{store.bags}</span>
            <span className="text-gray-600">Surprise Bags</span>
          </div>
        </div>
        {/* Map Placeholder */}
        <div className="mb-10">
          <div className="w-full h-48 bg-green-100 rounded-xl flex items-center justify-center text-gray-400 text-lg">
            [Map Placeholder]
          </div>
        </div>
        {/* Available Bags */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Surprise Bags</h2>
          {message && <div className="mb-6 text-center text-green-700 font-semibold">{message}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bags.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No bags available.</div>
            ) : (
              bags.map((bag) => (
                <div key={bag.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center">
                  <img src={bag.image} alt={bag.category} className="w-32 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-6" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{bag.category}</h3>
                    <p className="text-gray-600 mb-2">{bag.description}</p>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Expires in {bag.expiresIn} hours</span>
                      <span className="ml-4">{bag.quantity} available</span>
                    </div>
                    <div className="flex items-end space-x-2 mb-2">
                      <span className="text-2xl font-bold text-green-600">${bag.price.toFixed(2)}</span>
                      <span className="text-gray-400 line-through">${bag.originalPrice.toFixed(2)}</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">{Math.round(100 - (bag.price / bag.originalPrice) * 100)}% OFF</span>
                    </div>
                    <button
                      className="mt-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition-all"
                      onClick={() => handleReserve(bag)}
                    >
                      Reserve Bag
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
