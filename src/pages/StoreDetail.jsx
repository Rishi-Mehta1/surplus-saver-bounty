
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, ShoppingBag, Star, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import CountdownTimer from '../components/CountdownTimer';

const StoreDetail = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [selectedBags, setSelectedBags] = useState([]);

  // Mock store data
  const mockStoreData = {
    1: {
      id: 1,
      name: "Walmart Supercenter - Downtown",
      address: "123 Main Street, Downtown, NY 10001",
      distance: "0.8 miles",
      phone: "(555) 123-4567",
      hours: "Open until 11:00 PM",
      rating: 4.5,
      surpriseBags: [
        {
          id: 1,
          category: "Bakery & Dairy",
          price: 4.00,
          originalPrice: 15.00,
          description: "Fresh bread, pastries, milk, yogurt, and cheese",
          expiresIn: 2,
          quantity: 3,
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
        },
        {
          id: 2,
          category: "Fresh Produce",
          price: 6.00,
          originalPrice: 20.00,
          description: "Seasonal fruits, vegetables, and leafy greens",
          expiresIn: 4,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
        },
        {
          id: 3,
          category: "Deli & Prepared",
          price: 5.00,
          originalPrice: 18.00,
          description: "Sandwiches, salads, and ready-to-eat meals",
          expiresIn: 1,
          quantity: 4,
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
        },
        {
          id: 4,
          category: "Snacks & Pantry",
          price: 3.00,
          originalPrice: 12.00,
          description: "Chips, crackers, nuts, and pantry staples",
          expiresIn: 6,
          quantity: 5,
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate API call
    if (mockStoreData[id]) {
      setStore(mockStoreData[id]);
    }
  }, [id]);

  const addToBag = (bagId) => {
    setSelectedBags(prev => [...prev, bagId]);
  };

  const removeFromBag = (bagId) => {
    setSelectedBags(prev => prev.filter(id => id !== bagId));
  };

  const getTotalPrice = () => {
    if (!store) return 0;
    return selectedBags.reduce((total, bagId) => {
      const bag = store.surpriseBags.find(b => b.id === bagId);
      return total + (bag ? bag.price : 0);
    }, 0);
  };

  const getTotalSavings = () => {
    if (!store) return 0;
    return selectedBags.reduce((total, bagId) => {
      const bag = store.surpriseBags.find(b => b.id === bagId);
      return total + (bag ? bag.originalPrice - bag.price : 0);
    }, 0);
  };

  if (!store) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-gray-600">Loading store details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Store Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{store.name}</h1>
              
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-green-600" />
                  <div>
                    <p>{store.address}</p>
                    <p className="text-sm">{store.distance} away</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-green-600" />
                  <p>{store.hours}</p>
                </div>
                
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-3 text-yellow-500" />
                  <p>{store.rating}/5.0 rating</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center lg:justify-end">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <ShoppingBag className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{store.surpriseBags.length}</p>
                <p className="text-gray-600">Surprise Bags Available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Bags */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Surprise Bags</h2>
            
            <div className="space-y-6">
              {store.surpriseBags.map((bag) => (
                <div key={bag.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    <div className="md:col-span-1">
                      <img 
                        src={bag.image} 
                        alt={bag.category}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{bag.category}</h3>
                          <p className="text-gray-600 mb-3">{bag.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">${bag.price.toFixed(2)}</p>
                          <p className="text-gray-500 line-through">${bag.originalPrice.toFixed(2)}</p>
                          <p className="text-sm text-green-600 font-medium">
                            Save ${(bag.originalPrice - bag.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-red-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <CountdownTimer expiresInHours={bag.expiresIn} />
                          </div>
                          <div className="flex items-center text-gray-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{bag.quantity} available</span>
                          </div>
                        </div>
                        
                        <div>
                          {selectedBags.includes(bag.id) ? (
                            <button
                              onClick={() => removeFromBag(bag.id)}
                              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              onClick={() => addToBag(bag.id)}
                              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
              
              {selectedBags.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No items selected</p>
              ) : (
                <div>
                  <div className="space-y-3 mb-4">
                    {selectedBags.map((bagId) => {
                      const bag = store.surpriseBags.find(b => b.id === bagId);
                      return (
                        <div key={bagId} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <div>
                            <p className="font-medium text-gray-800">{bag.category}</p>
                            <p className="text-sm text-gray-600">${bag.price.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => removeFromBag(bagId)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">You Save:</span>
                      <span className="font-semibold text-green-600">${getTotalSavings().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Reserve Now
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Pickup required within reservation time
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
