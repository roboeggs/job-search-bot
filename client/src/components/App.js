import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./Board/Board";
import Login from "./Login/Login";
import Signup from "./Singup/Singup";
import ProfileSettings  from "./ProfileSettings/ProfileSettings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} />
  
          <Route path='/register' element={<Signup />} />
          <Route path='/board' element={<Board />} />
          <Route path='/setting' element={<ProfileSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 