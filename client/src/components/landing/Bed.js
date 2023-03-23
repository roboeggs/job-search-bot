import React from 'react';
import bedPath from '../../images/bed.png'; // Путь к изображению внутри сборки
import './Bed.css' // импортируем CSS-файл
import hh from './../algorithm/hh';

function Bed() {
    return (
        // не забудьте о `className`
      <img className="bed-logo" alt="A comfortable bed" src={bedPath}/> 
    );
  }
  
export default Bed;  