import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

function RegionSelect({ value, onChange, addRegion, removeRegion, regions }) {
  const [newRegion, setNewRegion] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleNewRegionSubmit = (event) => {
    event.preventDefault();
    if (newRegion.trim() !== '') {
      addRegion(newRegion.trim());
      setNewRegion('');
    }
  };

  const handleRegionClick = (region) => {
    removeRegion(region);
  };

  const handleNewRegionChange = (event) => {
    const newRegionValue = event.target.value.trim();
    setNewRegion(newRegionValue);
    debouncedSearch(newRegionValue);
  };
  
  const debouncedSearch = debounce((newRegionValue) => {
    if (newRegionValue.trim() !== '' && newRegionValue.trim().length > 2) {
      const url = new URL("https://api.hh.ru/suggests/area_leaves");
      url.search = new URLSearchParams({
        text: newRegionValue.trim(),
      });
      fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "application/json"
        },
      })
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.items);
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      setSearchResults([]);
    }
  }, 2000);

  return (
    <div>
      <form onSubmit={handleNewRegionSubmit} className="flex">
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
      {searchResults.map((region) => (
        <div
          key={region.id}
          onClick={() => {
            addRegion(region.name);
            setNewRegion('');
            setSearchResults([]);
          }}
          className="flex text-black items-center justify-between bg-gray-100 rounded-lg px-4 py-2 mt-2 cursor-pointer"
        >
          <span>{region.name}</span>
        </div>
      ))}
      {regions.map((region) => (
        <div
          key={region}
          onClick={() => handleRegionClick(region)}
          className="flex text-black items-center justify-between bg-gray-100 rounded-lg px-4 py-2 mt-2 cursor-pointer"
        >
          <span>{region}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
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
  regions: PropTypes.array
};

export default RegionSelect;
