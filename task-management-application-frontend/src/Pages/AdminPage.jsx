import React, { useState, useEffect } from 'react';
import { Container, Paper,Button, Typography, Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TaskTable from './TaskTable';

// Define a CSS class to remove borders
const noBorder = {
    border: 'none',
  };

function AdminPage(){
    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const [userData, setUserData] = useState(null);
    const [taskData,setTaskData]= useState(null);
    const [loading, setLoading] = useState(true);
    const [userError, setUserError] = useState(null);
    const [taskError, setTaskError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const userData = await axios.get(`http://localhost:8080/users/getUserByUsername/${username}`);
          setUserData(userData.data);
      
          const taskData = await axios.get(`http://localhost:8080/tasks/getAllTasksByUsername/${username}`);
          setTaskData(taskData.data);
          console.log('taskData:', taskData);
      
          setLoading(false);
        } catch (error) {
          console.log('Error occurred when fetching data: ', error);
          setLoading(false);

          if (error.config && error.config.url) {
            if (error.config.url.includes('/users/')) {
              setUserError('User data not found.'); // Set user error
            } else if (error.config.url.includes('/tasks/')) {
              setTaskError('Task data not found.'); // Set task error
            }
          } else {
            console.log('Error config or URL not available in the error object.');
          }
          
          setLoading(false);
        }
      };      

      fetchData();
    },[username]
    )
    return(
        <Container>
            <Box textAlign={"center"}>
            <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 45, fontWeight: "bold", color: "#C0C2E3", }} component="div" gutterBottom>
                User Profile
            </Typography>
            </Box>
            <Box textAlign="center" style={{backgroundColor: "rgba(186, 223, 231, 0.7)"}} sx={{ maxWidth: 900,marginLeft:18,marginRight:18,marginBottom:3,borderRadius:2}} >
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : userData ? (
            <Box>
              <Table >
                <TableBody>
                <TableRow>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 20,  fontWeight: "bold",color: "black", textAlign:"center"}}>
                        User Id:
                      </Typography>
                    </TableCell>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 17, color: "black", }}>
                        {userData.userId}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 20,  fontWeight: "bold",color: "black", textAlign:"center"}}>
                        First Name:
                      </Typography>
                    </TableCell>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 17, color: "black", }}>
                        {userData.firstName}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 20,  fontWeight: "bold",color: "black", textAlign:"center"}}>
                        Last Name:
                      </Typography>
                    </TableCell>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 17, color: "black", }}>
                        {userData.lastName}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 20,  fontWeight: "bold",color: "black", textAlign:"center"}}>
                        Email:
                      </Typography>
                    </TableCell>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 17, color: "black", }}>
                        {userData.email}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 20,  fontWeight: "bold",color: "black", textAlign:"center"}}>
                        Username:
                      </Typography>
                    </TableCell>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 17, color: "black", }}>
                        {userData.username}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 20,  fontWeight: "bold",color: "black", textAlign:"center"}}>
                        Role:
                      </Typography>
                    </TableCell>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 17, color: "black", }}>
                        {userData.role}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
          </Box>
        ) : (
          <Typography variant="body1">User data not found.</Typography>
        )}
      </Box><br/><br/>
      <Box textAlign="center">
        {loading ? (
          <CircularProgress />
        ) : (
          // Use the TaskTable component and pass the taskData as a prop
          <TaskTable taskData={taskData} setTaskData={setTaskData}/>
        )}
      </Box>
      
      <Box textAlign="center">
      <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{
            m: 3,
            width: "20ch",
            backgroundColor: "#BADFE7",
            color: "black",
            fontWeight: "bold",
            fontFamily: "Inika",
            fontSize: 20,
          }}
        >
          Logout
        </Button>
      </Box>
        </Container>
    );
}
export default AdminPage;