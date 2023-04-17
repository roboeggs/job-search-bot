import React, { useState, useRef, useEffect  } from 'react';
import RegionSelect from '../RegionSelect/RegionSelect';
import SalaryRange from '../SalaryRange/SalaryRange';
import ResponseExample from '../ResponseExample/ResponseExample';
import Header from '../Header/Header';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import SearchBar from '../SearchBar/SearchBar';
import VacanciesList from '../VacanciesList/VacanciesList';
import { searchVacancies } from './../algorithm/api.js';

function Board() {
  const [searchTerm, setSearchTerm] = useState('');
  const [regions, setRegions] = useState([]);
  const [salaryRange, setSalaryRange] = useState({ from: '', to: '' });
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [hasMoreVacancies, setHasMoreVacancies] = useState(true);
  const [loadedVacanciesCount, setLoadedVacanciesCount] = useState(0);
  const [offset, setOffset] = useState(0);

  const [vacancies, setVacancies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMoreVacancies();
  }, []);

  const loadMoreVacancies = () => {
    const searchParameters = {
      text: searchTerm,
      area: '52', // set the area parameter to an empty string
      currency: 'RUR',
      per_page: 5,
      page: page,
    };
    
    return searchVacancies(searchParameters).then((response) => {
      const newVacancies = response.items;
      setVacancies([...vacancies, ...newVacancies]);
      setLoadedVacanciesCount(loadedVacanciesCount + newVacancies.length);
      if (newVacancies.length < searchParameters.per_page) {
        setHasMoreVacancies(false);
      }
      setPage(page + 1);
      return newVacancies;
    });
  };

  const handleAddRegion = (region) => {
    setRegions([...regions, region]);
  };

  const handleRemoveRegion = (regionToRemove) => {
    setRegions(regions.filter((region) => region !== regionToRemove));
  };

const handleSearch = async (value) => {
  setVacancies([]);
  setSearchTerm(value);
  setLoadedVacanciesCount(0);
  setHasMoreVacancies(true);
  setOffset(0);

  try {
    await loadMoreVacancies();
  } catch (error) {
    console.error(error);
  }
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
    <div className="container mx-auto my-8" >
      <Header onProfileClick={handleProfileSidebarOpen} />
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
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
            <li key={region.id}>{region.text}</li>
          ))}
        </ul>
   
        <h2 className="text-xl font-bold my-4">
          Selected Salary Range: {salaryRange.from[0]} - {salaryRange.from[1]}
          <span className="uppercase"> {salaryRange.to}</span>
        </h2>
        <ResponseExample />
      </div>
      <ProfileSidebar isOpen={isProfileSidebarOpen} onClose={handleProfileSidebarClose} />
      
      {vacancies.length > 0 &&  <VacanciesList vacancies={vacancies} loadMore={loadMoreVacancies} />}

    </div>
  );
}
export default Board;
