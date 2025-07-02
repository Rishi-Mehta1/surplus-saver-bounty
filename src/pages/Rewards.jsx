import React, { useEffect, useState } from 'react';

const rewardsList = [
  { id: 1, name: 'Free Surprise Bag', points: 1000 },
  { id: 2, name: '5% Off Coupon', points: 500 },
  { id: 3, name: 'Reusable Tote Bag', points: 300 },
];

const Rewards = () => {
  const [ecoPoints, setEcoPoints] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setEcoPoints(parseInt(localStorage.getItem('ecoPoints') || '0', 10));
  }, []);

  const handleRedeem = (reward) => {
    if (ecoPoints >= reward.points) {
      setEcoPoints(ecoPoints - reward.points);
      localStorage.setItem('ecoPoints', (ecoPoints - reward.points).toString());
      setMessage(`You redeemed: ${reward.name}! 🎉`);
    } else {
      setMessage('Not enough Eco Points to redeem this reward.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Rewards</h1>
          <p className="text-lg text-gray-600">Redeem your Eco Points for exclusive rewards!</p>
          <div className="mt-4 text-2xl font-bold text-green-600">Eco Points: {ecoPoints}</div>
        </div>
        {message && <div className="mb-6 text-center text-green-700 font-semibold">{message}</div>}
        <div className="grid grid-cols-1 gap-8">
          {rewardsList.map((reward) => (
            <div key={reward.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{reward.name}</h2>
                <p className="text-gray-600">{reward.points} Eco Points</p>
              </div>
              <button
                className="mt-4 md:mt-0 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow disabled:opacity-50"
                onClick={() => handleRedeem(reward)}
                disabled={ecoPoints < reward.points}
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rewards; 