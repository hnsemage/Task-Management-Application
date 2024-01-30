import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from "./NavigationBar/NavigationBar";
import Login from "./Pages/Login"; 
import Registration from "./Pages/Registration";
import UserPage from "./Pages/UserPage";
import AdminPage from "./Pages/AdminPage";
import TaskCreate from "./Pages/TaskCreate";
import UpdateTask from "./Pages/UpdateTask";
import UpdateUser from "./Pages/UpdateUser";
import ViewAllTasks from "./Pages/ViewAllTasks";
import ViewAllUsers from "./Pages/ViewAllUsers";
import UpdateAllUsers from "./Pages/UpdateAllUsers";


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
          <Route path='/update/:taskId' element={<UpdateTask/>}/>
          <Route path='/updateUser/:username' element={<UpdateUser/>}/>
          <Route path='/viewalltasks' element={<ViewAllTasks/>}/>
          <Route path='/viewallusers' element={<ViewAllUsers/>}/>
          <Route path='/updateallusers/:username' element={<UpdateAllUsers/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
