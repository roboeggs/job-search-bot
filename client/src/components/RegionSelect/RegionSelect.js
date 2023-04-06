import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { searchRegions } from './../algorithm/api.js';

function RegionSelect({ value, onChange, addRegion, removeRegion, regions }) {
  const [newRegion, setNewRegion] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchFirstString = (substring, objectArray) => {
    const lowerSubstring = substring.trim().toLowerCase();
    return objectArray.find(obj => obj.text.toLowerCase().startsWith(lowerSubstring));
  }

  const searchCityInList = (cityName, cityList) => {
    return cityList.some(city => city === cityName);
  }

  const handleNewRegionSubmit = (event) => {
    event.preventDefault();
    const serachCity = searchFirstString(newRegion.trim(), searchResults);
    if (serachCity !== undefined && !searchCityInList(serachCity.text, regions)) {
      addRegion(serachCity.text);
      setNewRegion('');
      setSearchResults([]);
    }
    
  };

  const handleRegionClick = (region) => {
    removeRegion(region);
  };

  const handleDebouncedSearch = useCallback(
    debounce((newRegionValue) => {
      if (newRegionValue.trim() !== '' && newRegionValue.trim().length > 2) {
        searchRegions(newRegionValue).then(data => {
            setSearchResults(data);
        });     
      } else {
        setSearchResults([]);
      }
    }, 500),
    []
  );
  
  const handleNewRegionChange = (event) => {
    const newRegionValue = event.target.value.trim();
    setNewRegion(newRegionValue);
    handleDebouncedSearch(newRegionValue);
  };

  return (
    <div>
      <form onSubmit={handleNewRegionSubmit} className="flex">
        <input
          type="text"
          value={newRegion}
          onChange={handleNewRegionChange}
          placeholder="Add region"
          className="text-black border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
      {searchResults.map((region) => (
        <div  
          key={region.id}
          onClick={() => {
            addRegion(region.text);
            setNewRegion('');
            setSearchResults([]);
          }} 
          className="flex text-black items-center justify-between bg-gray-100 hover:bg-emerald-100 rounded-lg px-4 py-2 mt-2 cursor-pointer"
        >
          <span>{region.text}</span>
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