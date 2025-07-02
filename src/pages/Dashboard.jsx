import React, { useEffect, useState } from 'react';
import { Leaf, TrendingUp, Award, ShoppingBag } from 'lucide-react';

const Dashboard = () => {
  const [ecoPoints, setEcoPoints] = useState(0);
  useEffect(() => {
    setEcoPoints(parseInt(localStorage.getItem('ecoPoints') || '0', 10));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Your Impact Dashboard</h1>
          <p className="text-lg text-gray-600 mb-2">Track your food rescue journey and see your positive impact!</p>
        </div>
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center">
            <Leaf className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-2xl font-bold text-green-600">{ecoPoints}</span>
            <span className="text-gray-600 mt-1">Eco Points</span>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-2xl font-bold text-blue-600">$87.50</span>
            <span className="text-gray-600 mt-1">Money Saved</span>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center">
            <Award className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-2xl font-bold text-purple-600">12.3kg</span>
            <span className="text-gray-600 mt-1">CO₂ Saved</span>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center">
            <ShoppingBag className="w-8 h-8 text-amber-600 mb-2" />
            <span className="text-2xl font-bold text-amber-600">25</span>
            <span className="text-gray-600 mt-1">Bags Rescued</span>
          </div>
        </div>
        {/* Placeholder Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Rescue Progress</h2>
            <div className="w-full h-40 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center text-gray-400">
              [Progress Chart Placeholder]
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">CO₂ Savings Over Time</h2>
            <div className="w-full h-40 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-gray-400">
              [CO₂ Chart Placeholder]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
