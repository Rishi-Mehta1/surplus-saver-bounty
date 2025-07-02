import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const mockStores = [
  {
    id: 1,
    name: 'Walmart Supercenter - Downtown',
    address: '123 Main St, Downtown',
    distance: '0.8 miles',
    bags: 12,
  },
  {
    id: 2,
    name: 'Walmart Neighborhood Market',
    address: '456 Oak Ave, Midtown',
    distance: '1.2 miles',
    bags: 8,
  },
  {
    id: 3,
    name: 'Walmart Supercenter - Eastside',
    address: '789 Pine Rd, Eastside',
    distance: '2.1 miles',
    bags: 15,
  },
];

const FindStores = () => {
  const [search, setSearch] = useState('');

  const filteredStores = mockStores.filter(store =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase()) ||
    store.distance.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Find Stores</h1>
          <p className="text-lg text-gray-600 mb-6">Locate Walmart stores near you with available surprise bags.</p>
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search by city, zip, or store name..."
              className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 bg-green-50 placeholder-gray-400 transition"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStores.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No stores found.</div>
          ) : (
            filteredStores.map((store) => (
              <div key={store.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start">
                <div className="flex items-center mb-3">
                  <MapPin className="w-6 h-6 text-green-600 mr-2" />
                  <span className="text-lg font-semibold text-gray-800">{store.name}</span>
                </div>
                <p className="text-gray-600 mb-1">{store.address}</p>
                <p className="text-gray-500 mb-2">{store.distance} away</p>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-2">{store.bags} Surprise Bags</span>
                <a href={`/store/${store.id}`} className="mt-auto inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg text-sm shadow transition-all">View Store</a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FindStores; 