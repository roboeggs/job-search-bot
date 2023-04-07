import React, { useState, useEffect } from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  const [searchTermValue, setSearchTermValue] = useState(searchTerm || '');

  useEffect(() => {
    setSearchTermValue(searchTerm || '');
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTermValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTermValue);
  };

  const handleClear = () => {
    setSearchTermValue('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="my-3 relative">
      <div className="flex items-center rounded-full py-2 px-3 bg-white shadow-md">
        <input
          type="text"
          placeholder="Search"
          value={searchTermValue}
          onChange={handleInputChange}
          className="text-black bg-transparent outline-none flex-grow"
        />
        {searchTermValue && (
          <button type="button" onClick={handleClear} className="ml-2 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 19a9 9 0 110-18 9 9 0 010 18zm3.182-12.01a1 1 0 10-1.414-1.414L10 8.586l-1.768-1.768a1 1 0 00-1.414 1.414L8.586 10l-1.768 1.768a1 1 0 101.414 1.414L10 11.414l1.768 1.768a1 1 0 001.414-1.414L11.414 10l1.768-1.768z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md ml-2"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
