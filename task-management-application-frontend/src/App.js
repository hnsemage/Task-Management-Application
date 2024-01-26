import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from "./NavigationBar/NavigationBar";
import Login from "./Pages/Login"; 
import Registration from "./Pages/Registration";
import UserPage from "./Pages/UserPage";
import AdminPage from "./Pages/AdminPage";
import TaskCreate from "./Pages/TaskCreate";
import UpdatePage from "./Pages/UpdatePage";

function App() {
  return (
    <div>
      <Router>
        <NavigationBar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path='/adminPage/:username' element={<AdminPage/>}/>
          <Route path='/userPage/:username' element={<UserPage/>}/>
          <Route path='/taskCreate' element={<TaskCreate/>}/>
          <Route path='/update/:taskId' element={<UpdatePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
