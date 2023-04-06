import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SalaryRange({ value, onChange }) {
  const [minSalary, setMinSalary] = useState(value && value[0] !== undefined ? value[0] : '');
  const [maxSalary, setMaxSalary] = useState(value && value[1] !== undefined ? value[1] : '');

  const [currency, setCurrency] = useState('rub');

  const handleMinSalaryChange = (event) => {
    const newMinSalary = event.target.value;
    setMinSalary(newMinSalary);
    if (maxSalary !== '' && newMinSalary > maxSalary) {
      setMaxSalary(newMinSalary);
    }
    if (onChange) {
      onChange([newMinSalary, maxSalary], currency);
    }
  };
  
  const handleMaxSalaryChange = (event) => {
    const newMaxSalary = event.target.value;
    setMaxSalary(newMaxSalary);
    if (minSalary !== '' && newMaxSalary < minSalary) {
      setMinSalary(newMaxSalary);
    }
    if (onChange) {
      onChange([minSalary, newMaxSalary], currency);
    }
  };
  
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
    if (onChange) {
      onChange([minSalary, maxSalary], event.target.value);
    }
  };

  return (
    <div className='flex flex-row'>
      <div className='flex flex-col items-center'>
        <h2>Salary Range</h2>
        <div>
          <label htmlFor="min-from" className="mr-2">from:</label>
          <input
            id="min-from"
            type="number"
            value={minSalary}
            onChange={handleMinSalaryChange}
            placeholder="Min"
            className="text-black border border-gray-400 rounded-l-lg px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            id="max-to"
            type="number"
            value={maxSalary}
            onChange={handleMaxSalaryChange}
            placeholder="Max"
            className="text-black border border-gray-400 rounded-r-lg px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="max-to" className="ml-2">:to</label>
        </div>
      </div>
      <div className="flex flex-col items-center ml-2">
        <h2>Currency</h2>
        <select value={currency} onChange={handleCurrencyChange} className="text-black border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="rub">RUB</option>
          <option value="usd">USD</option>
        </select>
      </div>
    </div>
  );
}

SalaryRange.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

export default SalaryRange;
