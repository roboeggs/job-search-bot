import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RegionSelect({ value, onChange, addRegion, removeRegion, regions }) {
  const [newRegion, setNewRegion] = useState('');

  const handleNewRegionChange = (event) => {
    setNewRegion(event.target.value);
  };

  const handleNewRegionSubmit = (event) => {
    event.preventDefault();
    addRegion(newRegion);
    setNewRegion('');
  };

  const handleRegionClick = (region) => {
    removeRegion(region);
  };

  return (
    <div>
      <form onSubmit={handleNewRegionSubmit} className="flex mb-4">
        <input
          type="text"
          value={newRegion}
          onChange={handleNewRegionChange}
          placeholder="Add region"
          className="text-black border border-gray-400 rounded-l-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:ml-2">
          Add
        </button>
      </form>
      {regions.map((region) => (
        <div
          key={region}
          onClick={() => handleRegionClick(region)}
          className="flex text-black w-32 items-center justify-between bg-gray-100 rounded-lg px-4 py-2 mb-2 cursor-pointer"
        >
          <span>{region}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.343 3.343a1 1 0 0 1 0 1.414L8.586 10l-5.243 5.243a1 1 0 1 1-1.414-1.414L7.172 10 2.93 5.757a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

RegionSelect.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  addRegion: PropTypes.func,
  removeRegion: PropTypes.func,
  regions: PropTypes.arrayOf(PropTypes.string),
};

export default RegionSelect;
