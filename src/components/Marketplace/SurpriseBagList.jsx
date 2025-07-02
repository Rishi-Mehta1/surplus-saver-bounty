import React from 'react';
import SurpriseBagCard from './SurpriseBagCard';

const SurpriseBagList = ({ bags = [] }) => {
  if (!bags.length) return <p className="text-center text-gray-500 py-12">No surprise bags available nearby.</p>;
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bags.map((bag) => (
          <SurpriseBagCard key={bag.id} bag={bag} />
        ))}
      </div>
    </div>
  );
};

export default SurpriseBagList; 