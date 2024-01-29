import React,{ useState, useEffect } from "react";
import { Container,Box,Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Button } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ViewAllTasks(){

    const navigate = useNavigate();

    const [taskData, setTaskData] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() =>{
        fetchTasks();

        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);
    },[]);

    const fetchTasks = async() =>{
        try{
            const response = await axios.get('http://localhost:8080/tasks/getAllTasks');
            setTaskData(response.data);
        }catch(error){
            console.log('Error when fetching tasks: ',error);
        }
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

    return(
        <Container>
            <Box style={{ textAlign: 'center' }}>
            <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 45, fontWeight: "bold", color: "#C0C2E3", }} component="div" gutterBottom>
                All Tasks
            </Typography>
            </Box>
            <TableContainer component={Paper} style={{backgroundColor: "rgba(186, 223, 231, 0.7)",textAlign: 'center'}} sx={{ maxWidth: 1500,marginLeft:3,marginRight:10,marginBottom:2,borderRadius:2}} align="center">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Task ID</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Task Name</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Description</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Username</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Start Date</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">End Date</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Task Status</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskData.map((task,index)=>(
                            <TableRow key={index}>
                                <TableCell style={{ border: '1px solid white'}} align="center">{task.taskId}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{task.taskName}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{task.description}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{task.username}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{task.startDate}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{task.endDate}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{task.taskStatus}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">
                                <Button variant="contained"   style={{ margin: '8px' }}
                                    sx={{
                                        backgroundColor: "#314247",
                                        color: "#BADFE7",
                                        fontFamily: "Inika",
                                        fontSize: 15,
                                      }}>
                                        Update
                                    </Button>
                                    <Button variant="contained" onClick={() => handleDelete(task.taskId)}
                                    sx={{
                                        backgroundColor: "#314247",
                                        color: "#BADFE7",
                                        fontFamily: "Inika",
                                        fontSize: 15,
                                      }}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/adminPage/${username}`)}
            sx={{
              m: 3,
              width: "20ch",
              backgroundColor: "#647973",
              "&:hover": {
                backgroundColor: "#314247", // Set the background color on hover
              },
              color: "black",
              fontWeight: "bold",
              fontFamily: "Inika",
              fontSize: 20,
            }}>
            Back
          </Button>
          </Box>
        </Container>
    );
}

export default ViewAllTasks;