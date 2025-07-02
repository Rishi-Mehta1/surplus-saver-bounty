
import React, { useState } from 'react';
import { Leaf, Badge, TrendingUp, Calendar, Award } from 'lucide-react';
import Header from '../components/Header';

const Dashboard = () => {
  const [userStats] = useState({
    totalPoints: 1250,
    totalSaved: 87.50,
    co2Saved: 12.3,
    bagsRescued: 25,
    currentBadge: 'Food Saver',
    nextBadge: 'Zero Waste Hero',
    pointsToNext: 250
  });

  const [recentOrders] = useState([
    {
      id: 1,
      store: 'Walmart Supercenter - Downtown',
      date: '2025-01-08',
      items: 'Bakery & Dairy Mix',
      price: 4.00,
      originalPrice: 15.00,
      points: 50
    },
    {
      id: 2,
      store: 'Walmart Neighborhood Market',
      date: '2025-01-06',
      items: 'Fresh Produce Box',
      price: 6.00,
      originalPrice: 20.00,
      points: 75
    },
    {
      id: 3,
      store: 'Walmart Supercenter - Eastside',
      date: '2025-01-04',
      items: 'Deli Prepared Foods',
      price: 5.00,
      originalPrice: 18.00,
      points: 65
    }
  ]);

  const badges = [
    { name: 'Eco Starter', icon: '🌱', unlocked: true, description: 'First surprise bag purchased' },
    { name: 'Food Saver', icon: '🥕', unlocked: true, description: '10 bags rescued from waste' },
    { name: 'Zero Waste Hero', icon: '🍞', unlocked: false, description: '50 bags rescued from waste' },
    { name: 'Planet Guardian', icon: '🌍', unlocked: false, description: '100 bags rescued from waste' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Impact Dashboard</h1>
          <p className="text-xl text-gray-600">See how you're making a difference, one bag at a time</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{userStats.totalPoints}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Eco Points</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">${userStats.totalSaved}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Money Saved</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">{userStats.co2Saved}kg</span>
            </div>
            <h3 className="text-gray-600 font-medium">CO₂ Saved</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Badge className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-2xl font-bold text-amber-600">{userStats.bagsRescued}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Bags Rescued</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-green-600" />
              Recent Orders
            </h2>
            
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{order.store}</h3>
                      <p className="text-gray-600 text-sm">{order.items}</p>
                      <p className="text-gray-500 text-xs">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${order.price.toFixed(2)}</p>
                      <p className="text-gray-500 text-sm line-through">${order.originalPrice.toFixed(2)}</p>
                      <p className="text-green-600 text-xs">+{order.points} points</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges & Achievements */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-green-600" />
              Eco Badges
            </h2>
            
            {/* Progress to next badge */}
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-amber-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Progress to {userStats.nextBadge}</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((userStats.totalPoints % 500) / 500) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{userStats.pointsToNext} points to go</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    badge.unlocked
                      ? 'border-green-200 bg-green-50 shadow-md'
                      : 'border-gray-200 bg-gray-50 opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-2 text-center">{badge.icon}</div>
                  <h3 className="font-semibold text-center text-sm mb-1">{badge.name}</h3>
                  <p className="text-xs text-gray-600 text-center">{badge.description}</p>
                  {badge.unlocked && (
                    <div className="mt-2 text-center">
                      <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        Unlocked!
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
