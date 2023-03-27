import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center border rounded-lg py-2 px-3">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          className="bg-transparent outline-none flex-grow"
        />
        {searchTerm && (
          <button type="button" onClick={handleClear} className="ml-2 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 19a9 9 0 110-18 9 9 0 010 18zm3.182-12.01a1 1 0 10-1.414-1.414L10 8.586l-1.768-1.768a1 1 0 00-1.414 1.414L8.586 10l-1.768 1.768a1 1 0 101.414 1.414L10 11.414l1.768 1.768a1 1 0 001.414-1.414L11.414 10l1.768-1.768z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
