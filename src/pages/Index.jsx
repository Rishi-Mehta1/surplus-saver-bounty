import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, MapPin, Clock, Star } from 'lucide-react';
import Header from '../components/Header';
import StoreCard from '../components/StoreCard';
import CountdownTimer from '../components/CountdownTimer';

const Index = () => {
  const [nearbyStores, setNearbyStores] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  // Mock data for nearby stores
  const mockStores = [
    {
      id: 1,
      name: "Walmart Supercenter - Downtown",
      distance: "0.8 miles",
      surpriseBags: 12,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      nextExpiry: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      bags: [
        { id: 1, price: 4, originalPrice: 15, category: "Bakery & Dairy", expiresIn: 2 },
        { id: 2, price: 6, originalPrice: 20, category: "Fresh Produce", expiresIn: 4 }
      ]
    },
    {
      id: 2,
      name: "Walmart Neighborhood Market",
      distance: "1.2 miles", 
      surpriseBags: 8,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      nextExpiry: new Date(Date.now() + 3 * 60 * 60 * 1000),
      bags: [
        { id: 3, price: 5, originalPrice: 18, category: "Deli & Prepared", expiresIn: 3 }
      ]
    },
    {
      id: 3,
      name: "Walmart Supercenter - Eastside",
      distance: "2.1 miles",
      surpriseBags: 15,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop", 
      nextExpiry: new Date(Date.now() + 1 * 60 * 60 * 1000),
      bags: [
        { id: 4, price: 3, originalPrice: 12, category: "Snacks & Pantry", expiresIn: 1 },
        { id: 5, price: 7, originalPrice: 25, category: "Meat & Seafood", expiresIn: 2 }
      ]
    }
  ];

  useEffect(() => {
    // Simulate getting user location and nearby stores
    setUserLocation({ lat: 40.7128, lng: -74.0060 }); // Mock NYC coordinates
    setNearbyStores(mockStores);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Save Food.<br />
              Save Money.<br />
              <span className="text-green-600">Save Earth.</span>
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover discounted surprise bags filled with perfectly good food 
            that would otherwise go to waste. Every purchase helps reduce food waste 
            and saves you money!
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button className="w-full sm:w-auto bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Find Surprise Bags Near You
            </button>
            <button className="w-full sm:w-auto border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-all duration-300">
              Learn How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">2.5M lbs</h3>
              <p className="text-gray-600">Food saved from waste</p>
            </div>
            <div className="p-6">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">$850K</h3>
              <p className="text-gray-600">Saved by customers</p>
            </div>
            <div className="p-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">150+</h3>
              <p className="text-gray-600">Walmart locations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Stores */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Surprise Bags Near You</h2>
            <p className="text-xl text-gray-600">Fresh savings updated every hour</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Find Nearby Stores</h3>
              <p className="text-green-100">Discover Walmart locations near you with available surprise bags</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Reserve Your Bag</h3>
              <p className="text-green-100">Choose from available surprise bags and reserve before they expire</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Save & Earn Points</h3>
              <p className="text-green-100">Pick up your bag, save money, and earn eco points for your impact</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
