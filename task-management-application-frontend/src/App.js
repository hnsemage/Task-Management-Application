import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from "./NavigationBar/NavigationBar";
import Login from "./Pages/Login"; 
import Registration from "./Pages/Registration";
import UserPage from "./Pages/UserPage";
import AdminPage from "./Pages/AdminPage";

function App() {
  return (
    <div>
      <Router>
        <NavigationBar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path='/adminPage' element={<AdminPage/>}/>
          <Route path='/userPage' element={<UserPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
