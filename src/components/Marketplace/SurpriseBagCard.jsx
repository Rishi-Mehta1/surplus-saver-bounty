import React, { useEffect, useState } from 'react';
import { getDynamicPrice } from '../../api/aiService';
import { Clock } from 'lucide-react';
import QRCode from 'react-qr-code';

const SurpriseBagCard = ({ bag }) => {
  const [dynamicPrice, setDynamicPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQrValue] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);
    getDynamicPrice(bag.originalPrice, bag.expiry)
      .then((price) => {
        if (isMounted) {
          setDynamicPrice(price);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setDynamicPrice(bag.originalPrice);
          setError(true);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, [bag.originalPrice, bag.expiry]);

  const discount = dynamicPrice
    ? Math.round(100 - (dynamicPrice / bag.originalPrice) * 100)
    : bag.discount;

  const handleReserve = () => {
    // Save reservation to localStorage (mock order history)
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const reservation = {
      ...bag,
      reservedAt: new Date().toISOString(),
      reservedPrice: dynamicPrice || bag.price,
    };
    localStorage.setItem('reservations', JSON.stringify([...reservations, reservation]));
    // Award Eco Points
    const prevPoints = parseInt(localStorage.getItem('ecoPoints') || '0', 10);
    localStorage.setItem('ecoPoints', (prevPoints + 100).toString());
    // Generate QR code value (could be reservation ID or details)
    setQrValue(`Reservation|${bag.id}|${reservation.reservedAt}|${reservation.reservedPrice}`);
    setShowQR(true);
  };

  const handleCloseQR = () => setShowQR(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col h-full border border-green-100 hover:shadow-2xl transition-all">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">{bag.store}</h3>
        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">{discount}% OFF</span>
      </div>
      <p className="text-gray-600 mb-2"><span className="font-semibold">Items:</span> {bag.items}</p>
      <div className="flex items-center mb-4 text-gray-500 text-sm">
        <Clock className="w-4 h-4 mr-1" />
        <span>Expires: {new Date(bag.expiry).toLocaleString()}</span>
      </div>
      <div className="mt-auto">
        {loading ? (
          <p className="text-green-600 font-semibold">Loading price...</p>
        ) : (
          <div className="flex items-end space-x-2 mb-2">
            <span className="text-2xl font-bold text-green-600">${dynamicPrice?.toFixed(2)}</span>
            <span className="text-gray-400 line-through">${bag.originalPrice.toFixed(2)}</span>
            {error && <span className="text-xs text-red-500 ml-2">(AI unavailable)</span>}
          </div>
        )}
        <button
          className="w-full mt-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition-all"
          onClick={handleReserve}
        >
          Reserve Bag
        </button>
      </div>
      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center relative max-w-xs w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Show this QR at Pickup</h2>
            <QRCode value={qrValue} size={180} />
            <button
              className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow"
              onClick={handleCloseQR}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurpriseBagCard; 