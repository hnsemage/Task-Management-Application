import React, { useState } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Button, TextField, FormControl, Select, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";

const TaskTable = ({ taskData , setTaskData}) => {
  
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortOption, setSortOption] = useState('none');
  
  const handleUpdate = (taskId) => {
    const selectedTask = taskData.find((task) => task.taskId === taskId)
    navigate(`/update/${taskId}`, { state: { from: "TaskTable", task: selectedTask } });
    console.log(`Update button clicked for Task ID: ${taskId}`);
  };
  
  const handleDelete = async(taskId) => {
    try{
      await axios.delete(`http://localhost:8080/tasks/deleteTask/${taskId}`);
      // Update the local state to reflect the changes
      setTaskData((prevTaskData) => prevTaskData.filter((record) => record.taskId !== taskId));
      console.log(`Delete button clicked for Task ID: ${taskId}`);
    } catch (error) {
      console.error('Error occurred when deleting task: ', error);
    };
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredTasks([]);
      return;
    }

    const filtered = taskData.filter((task) => {
      return task.taskId.toString().includes(query) || task.taskStatus.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredTasks(filtered);
  };

  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  const handleSortChange = (e) =>{
    setSortOption(e.target.value);
    if(e.target.value === 'status'){
      const sorted = [...taskData].sort((a,b) => a.taskStatus.localeCompare(b.taskStatus));
      setTaskData(sorted);
      } else if (e.target.value === 'none') {
      setTaskData(taskData.sort((a, b) => a.taskId - b.taskId)); // Sort by taskId
    }
    };

  const tasksToDisplay = searchQuery ? filteredTasks : taskData;
  
  return (
    <div>
      <TextField
      label="Search"
      variant='filled'
      value={searchQuery}
      onChange={handleChange}

      style={{marginBottom:'20px', marginRight:'20px'}}
      sx={{
        width: "20ch",
        backgroundColor: "#BADFE7",
        color: "black",
        fontWeight: "bold",
        fontFamily: "Inika",
        fontSize: 20,
        borderRadius:'10px'
      }}/>
      <FormControl variant="outlined" style={{ marginBottom: '16px' }}>
        <Select
          value={sortOption}
          onChange={handleSortChange}
          
          sx={{
            width: "20ch",
            backgroundColor: "#BADFE7",
            color: "black",
            fontWeight: "bold",
            fontFamily: "Inika",
            fontSize: 20,
            borderRadius:'10px'
          }}
        >
          <MenuItem value="none" selected>Sort By</MenuItem>
          <MenuItem value="status">Task Status</MenuItem>
        </Select>
      </FormControl>
    <TableContainer component={Paper} style={{ backgroundColor: "rgba(186, 223, 231, 0.7)", borderRadius: 3 }}>
      <Table>
        <TableHead >
          <TableRow >
            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Task Id</TableCell>
            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Task Name</TableCell>
            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Description</TableCell>
            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Start Date</TableCell>
            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">End Date</TableCell>
            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Status</TableCell>
            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ textAlign: 'center' }}>
          {tasksToDisplay.map((record, index) => (
            <TableRow key={index}>
              <TableCell style={{ border: '1px solid white'}} align="center">{record.taskId}</TableCell>
              <TableCell style={{ border: '1px solid white'}} align="center">{record.taskName}</TableCell>
              <TableCell style={{ border: '1px solid white'}} align="center">{record.description}</TableCell>
              <TableCell style={{ border: '1px solid white'}} align="center">{record.startDate}</TableCell>
              <TableCell style={{ border: '1px solid white'}} align="center">{record.endDate}</TableCell>
              <TableCell style={{ border: '1px solid white'}} align="center">{record.taskStatus}</TableCell>
              <TableCell style={{ border: '1px solid white'}} align="center">
                <Button variant="contained" onClick={() => handleUpdate(record.taskId)} style={{ marginRight: '8px' }}
                sx={{
                  backgroundColor: "#314247",
                  color: "#BADFE7",
                  fontFamily: "Inika",
                  fontSize: 15,
                }}>
                  Update
                </Button>
                <Button variant="contained"  onClick={() => handleDelete(record.taskId)}
                sx={{
                  backgroundColor: "#314247",
                  color: "#BADFE7",
                  fontFamily: "Inika",
                  fontSize: 15,
                }}>
                  Delete
                </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default TaskTable;
