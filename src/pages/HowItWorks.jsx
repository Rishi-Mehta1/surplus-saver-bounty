import React from 'react';
import { MapPin, Clock, Leaf } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-100 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">How It Works</h1>
        <p className="text-lg text-gray-600 mb-12">Rescue food, save money, and help the planet in 3 easy steps.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <MapPin className="w-10 h-10 text-green-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">1. Find Nearby Stores</h2>
            <p className="text-gray-600">Discover Walmart locations near you with available surprise bags.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <Clock className="w-10 h-10 text-green-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">2. Reserve Your Bag</h2>
            <p className="text-gray-600">Choose from available surprise bags and reserve before they expire.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <Leaf className="w-10 h-10 text-green-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">3. Save & Earn Points</h2>
            <p className="text-gray-600">Pick up your bag, save money, and earn eco points for your impact.</p>
          </div>
        </div>
        <div className="mt-8">
          <a href="/marketplace" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-lg transition-all">Start Rescuing Food</a>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks; 