import React from 'react';

function Header({ onProfileClick }) {
  return (
    <header className="flex justify-between items-center mb-8">
      <div className="text-4xl text-xl font-bold">Job Search</div>
      <button
        className="bg-blue-500 font-bold py-2 px-4 rounded"
        onClick={onProfileClick}
      >
        Profile
      </button>
    </header>
  );
}

export default Header;
