import React, { useState } from 'react';
import RegionSelect from '../RegionSelect/RegionSelect';
import SalaryRange from '../SalaryRange/SalaryRange';
import ResponseExample from '../ResponseExample/ResponseExample';
import Header from '../Header/Header';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import SearchBar from '../SearchBar/SearchBar'; 

function Board() {
  const [regions, setRegions] = useState([]);
  const [salaryRange, setSalaryRange] = useState({ from: '', to: '' });
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);

  const handleAddRegion = (region) => {
    setRegions([...regions, region]);
  };

  const handleRemoveRegion = (regionToRemove) => {
    setRegions(regions.filter((region) => region !== regionToRemove));
  };

  const handleSearch = (searchTerm) => {
    console.log(`Search term: ${searchTerm}`);
  };

  const handleSalaryRangeChange = (from, to) => {
    setSalaryRange({ from, to });
  };

  const handleProfileSidebarOpen = () => {
    setIsProfileSidebarOpen(true);
  };

  const handleProfileSidebarClose = () => {
    setIsProfileSidebarOpen(false);
  };

  return (
    <div className="container mx-auto my-8">
      <Header onProfileClick={handleProfileSidebarOpen} />
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RegionSelect
          regions={regions}
          addRegion={handleAddRegion}
          removeRegion={handleRemoveRegion}
        />
        <SalaryRange onChange={handleSalaryRangeChange} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Selected Regions</h2>
        <ul>
          {regions.map((region) => (
            <li key={region} className="mb-2">
              {region}
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bold my-4">
          Selected Salary Range: {salaryRange.from[0]} - {salaryRange.from[1]}
          <span className="uppercase"> {salaryRange.to}</span>
        </h2>
        <ResponseExample />
      </div>
      <ProfileSidebar isOpen={isProfileSidebarOpen} onClose={handleProfileSidebarClose} />

    </div>
  );
}

export default Board;
