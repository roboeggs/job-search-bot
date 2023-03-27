import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SalaryRange({ value, onChange }) {
  const [minSalary, setMinSalary] = useState(value ? value[0] : '');
  const [maxSalary, setMaxSalary] = useState(value ? value[1] : '');
  const [currency, setCurrency] = useState('rub');

  const handleMinSalaryChange = (event) => {
    setMinSalary(event.target.value);
    if (onChange) {
      onChange([event.target.value, maxSalary], currency);
    }
  };

  const handleMaxSalaryChange = (event) => {
    setMaxSalary(event.target.value);
    if (onChange) {
      onChange([minSalary, event.target.value], currency);
    }
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
    if (onChange) {
      onChange([minSalary, maxSalary], event.target.value);
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <span className="mr-2">Salary range:</span>
        <input
          type="number"
          value={minSalary}
          onChange={handleMinSalaryChange}
          placeholder="Min"
          className="text-black border border-gray-400 rounded-l-lg px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={maxSalary}
          onChange={handleMaxSalaryChange}
          placeholder="Max"
          className="text-black border border-gray-400 rounded-r-lg px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="ml-4">
        <span className="mr-2">Currency:</span>
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
