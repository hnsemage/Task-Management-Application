import React,{ useState, useEffect } from "react";
import { Container,Box,Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Button } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ViewAllUsers(){

    const navigate = useNavigate();

    const [userData, setUserData] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() =>{
        fetchUsers();

        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);
    },[]);

    const fetchUsers = async() =>{
        try{
            const response = await axios.get('http://localhost:8080/users/getAllUsers');
            setUserData(response.data);
        }catch(error){
            console.log('Error when fetching users: ',error);
        }
    };

    const handleDelete = async(userId) => {
        try{
          await axios.delete(`http://localhost:8080/users/deleteUser/${userId}`);
          // Update the local state to reflect the changes
          setUserData((prevTaskData) => prevTaskData.filter((record) => record.taskId !== userId));
          console.log(`Delete button clicked for User ID: ${userId}`);
        } catch (error) {
          console.error('Error occurred when deleting user: ', error);
        };
      };

    return(
        <Container>
            <Box style={{ textAlign: 'center' }}>
            <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 45, fontWeight: "bold", color: "#C0C2E3", }} component="div" gutterBottom>
                All Users
            </Typography>
            </Box>
            <TableContainer component={Paper} style={{backgroundColor: "rgba(186, 223, 231, 0.7)",textAlign: 'center'}} sx={{ maxWidth: 1500,marginLeft:3,marginRight:10,marginBottom:2,borderRadius:2}} align="center">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">User ID</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">First Name</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Last Name</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Email</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Username</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Role</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData.map((user,index)=>(
                            <TableRow key={index}>
                                <TableCell style={{ border: '1px solid white'}} align="center">{user.userId}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{user.firstName}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{user.lastName}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{user.email}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{user.username}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{user.role}</TableCell>
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
                                    <Button variant="contained" onClick={() => handleDelete(user.userId)}
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

export default ViewAllUsers;