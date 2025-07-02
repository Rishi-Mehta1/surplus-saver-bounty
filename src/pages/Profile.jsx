import React, { useEffect, useState } from 'react';
import { Award, ShoppingBag } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const BACKEND_URL = 'http://localhost:4000';

const Profile = () => {
  const { user } = useUser();
  const [ecoPoints, setEcoPoints] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchUserData = async () => {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/users/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setEcoPoints(data.ecoPoints || 0);
        setReservations(data.reservations || []);
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user]);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Sign in to view your profile.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Your Profile</h1>
          <p className="text-lg text-gray-600">Track your Eco Points and order history.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-full md:w-1/2">
            <Award className="w-10 h-10 text-green-600 mb-2" />
            <span className="text-3xl font-bold text-green-600">{ecoPoints}</span>
            <span className="text-gray-600 mt-1">Eco Points</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-full md:w-1/2">
            <ShoppingBag className="w-10 h-10 text-amber-600 mb-2" />
            <span className="text-3xl font-bold text-amber-600">{reservations.length}</span>
            <span className="text-gray-600 mt-1">Bags Reserved</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : reservations.length === 0 ? (
            <p className="text-gray-500">No reservations yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {reservations.map((r, idx) => (
                <li key={idx} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="font-semibold text-gray-800">{r.store}</span>
                    <span className="ml-2 text-gray-500">({r.items})</span>
                  </div>
                  <div className="text-gray-600 mt-2 md:mt-0">
                    <span className="mr-4">${r.reservedPrice?.toFixed(2)}</span>
                    <span className="mr-4">Reserved: {new Date(r.reservedAt).toLocaleString()}</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">{r.discount}% OFF</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 