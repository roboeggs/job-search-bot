import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./Board/Board";
import Login from "./Login/Login";
import Signup from "./Singup/Singup";
// import Header from './landing/Header'; // прошу любить и жаловать компонент header
// import Bed from './landing/Bed' // и окажите компоненту bed тёплый приём
// import InfoForm from './landing/InfoForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} />
  
          <Route path='/register' element={<Signup />} />
          <Route path='/Board' element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 