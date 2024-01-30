import React,{ useState, useEffect } from "react";
import { Container,Box,Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Button,TextField,FormControl,Select,MenuItem } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ViewAllUsers(){

    const navigate = useNavigate();

    const [userData, setUserData] = useState([]);
    const [username, setUsername] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sortOption, setSortOption] = useState('none');


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
          setUserData((prevTaskData) => prevTaskData.filter((record) => record.userId !== userId));
          console.log(`Delete button clicked for User ID: ${userId}`);
        } catch (error) {
          console.error('Error occurred when deleting user: ', error);
        };
      };

      const handleUpdate = (username) => {
        const selectedUser = userData.find((user) => user.username === username)
        navigate(`/updateallusers/${username}`, { state: { user: selectedUser } });
        console.log(`Update button clicked for Username: ${username}`);
      };

      const handleSearch = (query) => {
        setSearchQuery(query);
        if (!query) {
          setFilteredUsers([]);
          return;
        }
    
        const filtered = userData.filter((user) => {
          return user.userId.toString().includes(query) || user.role.toLowerCase().includes(query.toLowerCase()) || user.username.toLowerCase().includes(query.toLowerCase()) || user.firstName.toLowerCase().includes(query.toLowerCase()) || user.lastName.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredUsers(filtered);
      };
    
      const handleChange = (e) => {
        handleSearch(e.target.value);
      };

      const handleSortChange = (e) => {
        setSortOption(e.target.value);
        if (e.target.value === 'role') {
          const sorted = [...userData].sort((a, b) => a.role.localeCompare(b.role));
          setUserData(sorted);
        } else if (e.target.value === 'none') {
          setUserData(userData.sort((a, b) => a.userId - b.userId)); // Sort by taskId
        } else if (e.target.value === 'username') {
          setUserData(userData.sort((a, b) => a.username.localeCompare(b.username)));
        } else if (e.target.value === 'firstName') {
          setUserData(userData.sort((a, b) => a.firstName.localeCompare(b.firstName)));
        } else if (e.target.value === 'lastName') {
          setUserData(userData.sort((a, b) => a.lastName.localeCompare(b.lastName)));
        }
      }
      

      const usersToDisplay = searchQuery ? filteredUsers : userData;

    return(
        <Container>
            <Box style={{ textAlign: 'center' }}>
            <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 45, fontWeight: "bold", color: "#C0C2E3", }} component="div" gutterBottom>
                All Users
            </Typography>
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
          <MenuItem value="role">Role</MenuItem>
          <MenuItem value="username">Username</MenuItem>
          <MenuItem value="firstName">First Name</MenuItem>
          <MenuItem value="lastName">Last Name</MenuItem>
        </Select>
      </FormControl>
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
                        {usersToDisplay.map((user,index)=>(
                            <TableRow key={index}>
                                <TableCell style={{ border: '1px solid white'}} align="center">{user.userId}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{user.firstName}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{user.lastName}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{user.email}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{user.username}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{user.role}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">
                                    <Button variant="contained" onClick={() => handleUpdate(user.username)}  style={{ margin: '8px' }}
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