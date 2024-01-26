// TaskTable.js
import React from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const TaskTable = ({ taskData , setTaskData}) => {
  const navigate = useNavigate();

        const handleUpdate = (taskId) => {
          const selectedTask = taskData.find((task) => task.taskId === taskId)
          navigate(`/update/${taskId}`, {state:selectedTask});
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
    }
  return (
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
          {taskData.map((record, index) => (
            <TableRow key={index}>
              <TableCell style={{ border: '1px solid white'}} align="center">{record.taskId}</TableCell>
              <TableCell style={{ border: '1px solid white'}} align="center">{record.taskName}</TableCell>
              <TableCell style={{ border: '1px solid white'}} align="center">{record.description}</TableCell>
              <TableCell style={{ border: '1px solid white'}} align="center">{record.startDate}</TableCell>
              <TableCell style={{ border: '1px solid white'}} align="center">{record.endDate}</TableCell>
              <TableCell style={{ border: '1px solid white'}} align="center">{record.taskStatus}</TableCell>
              <TableCell style={{ border: '1px solid white'}} align="center"><Button variant="outlined" color="primary" onClick={() => handleUpdate(record.taskId)} style={{ marginRight: '8px' }}>
                      Update
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(record.taskId)}>
                      Delete
                    </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
