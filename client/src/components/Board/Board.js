import React, { useState, useRef  } from 'react';
import RegionSelect from '../RegionSelect/RegionSelect';
import SalaryRange from '../SalaryRange/SalaryRange';
import ResponseExample from '../ResponseExample/ResponseExample';
import Header from '../Header/Header';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import SearchBar from '../SearchBar/SearchBar';
import { searchVacancies } from './../algorithm/api.js';

function Board() {
  const [searchTerm, setSearchTerm] = useState('');
  const [regions, setRegions] = useState([]);
  const [salaryRange, setSalaryRange] = useState({ from: '', to: '' });
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [hasMoreVacancies, setHasMoreVacancies] = useState(true);
  const [loadedVacanciesCount, setLoadedVacanciesCount] = useState(0);
  const [offset, setOffset] = useState(0);

  const scrollRef = useRef(null);

  const handleScroll = async () => {
    if (
      scrollRef.current &&
      scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
        scrollRef.current.scrollHeight
    ) {
      try {
        const searchParameters = {
          text: searchTerm,
          area: '',
          currency: 'RUR',
          per_page: 10,
          page: Math.ceil(offset / 10) + 1,
        };
  
        const newVacancies = [];
        for (const region of regions) {
          const response = await searchVacancies({
            ...searchParameters,
            area: region.id,
          });
          if (response.items.length > 0) {
            newVacancies.push(...response.items);
          }
        }
  
        setVacancies([...vacancies, ...newVacancies]);
        setLoadedVacanciesCount(loadedVacanciesCount + searchParameters.per_page);
        setOffset(offset + searchParameters.per_page);
        if (newVacancies.length < searchParameters.per_page) {
          setHasMoreVacancies(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
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
  
    const searchParameters = {
      text: value,
      area: '',
      currency: 'RUR',
      per_page: 10
    };
  
    try {
      const newVacancies = [];
      for (const region of regions) {
        const response = await searchVacancies({...searchParameters, area: region.id});
        if (response.items.length > 0) {
          newVacancies.push(...response.items);
        }
      }
      console.log(newVacancies )
      setVacancies(newVacancies);
      setLoadedVacanciesCount(searchParameters.per_page);
      if (newVacancies.length <= searchParameters.per_page) {
        setHasMoreVacancies(false);
      }
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
      {vacancies.length > 0 && (
  <div className="overflow-auto">
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Job Title</th>
          <th className="px-4 py-2">City</th>
          <th className="px-4 py-2">Link</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {vacancies.map((vacancy) => (
          <tr key={vacancy.id}>
            <td className="px-4 py-2">{vacancy.name}</td>
            <td className="px-4 py-2">{vacancy.area.name}</td>
            <td className="px-4 py-2">
              <a
                href={vacancy.alternate_url}
                target="_blank"
                rel="noreferrer"
              >
                {vacancy.alternate_url}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
}

export default Board;
