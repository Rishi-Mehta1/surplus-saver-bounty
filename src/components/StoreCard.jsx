
import React from 'react';
import { MapPin, Clock, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';

const StoreCard = ({ store }) => {
  const { id, name, distance, surpriseBags, image, nextExpiry, bags } = store;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="relative">
        <img 
          src={image} 
          alt="Surprise bag contents"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {surpriseBags} bags
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{distance} away</span>
        </div>

        {/* Sample bags */}
        <div className="space-y-3 mb-4">
          {bags.slice(0, 2).map((bag) => (
            <div key={bag.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-green-600">${bag.price} Surprise Bag</p>
                  <p className="text-sm text-gray-600">{bag.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 line-through">${bag.originalPrice}</p>
                  <p className="text-xs text-red-600 font-medium">Save ${bag.originalPrice - bag.price}</p>
                </div>
              </div>
              
              <div className="flex items-center text-red-600 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <CountdownTimer expiresInHours={bag.expiresIn} />
              </div>
            </div>
          ))}
        </div>

        <Link
          to={`/store/${id}`}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>View All Bags</span>
        </Link>
      </div>
    </div>
  );
};

export default StoreCard;
