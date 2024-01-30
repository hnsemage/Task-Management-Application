import React, { useState,useEffect } from 'react';
import { Container,Button, TextField, FormControl, Box, Typography, MenuItem,styled } from "@mui/material";
import axios from 'axios';
import { useNavigate,useParams} from "react-router-dom";


const BlackMenuItem = styled(MenuItem)({
  backgroundColor: '#314247', // Set the background color to black
  '&:hover': {
    backgroundColor: '#314247', // Keep the background color black on hover
  },
  '&.Mui-selected': {
    backgroundColor: '#314247', // Set the selected item background color
  },
  
});


function UpdateAllUsers(){

    const navigate = useNavigate();
    const { username } = useParams();
    
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        role:"",
    });
    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/getUserByUsername/${username}`);
                const userData = response.data;
                setUser(userData); // Set user data including role
            } catch (error) {
                console.log('Error occurred when fetching user data: ', error);
            }
        };
    
        fetchUserData();
    }, [username]);
  
    
     
    const [firstNameErr, setFirstNameErr] = useState(false);
    const [lastNameErr, setLastNameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [roleErr, setRoleErr] = useState(false);

    const [messageFirstNameErr, setMessageFirstNameErr] = useState("");
    const [messageLastNameErr, setMessageLastNameErr] = useState("");
    const [messageEmailErr, setMessageEmailErr] = useState("");
    const [messageRoleErr, setMessageRoleErr] = useState("");

    const [recheckFormMessage, setRecheckFormMessage] = useState('');

    const [roleTypes, setRoleTypes] = useState(['Admin', 'User']);

    const handleFirstDropDownChange = (event) => {
        const selectedType = event.target.value;
        setUser({...user, role: selectedType});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        setFirstNameErr(false);
        setLastNameErr(false);
        setEmailErr(false);
        setRoleErr(false);
      
        if (user.firstName === "") {
            setFirstNameErr(true);
            setMessageFirstNameErr("First Name Required");
        }

        if (user.lastName === "") {
            setLastNameErr(true);
            setMessageLastNameErr("Last Name Required");
        }

        if (user.email === "") {
            setEmailErr(true);
            setMessageEmailErr("Email Required");
        }

        if (user.role === "") {
            setRoleErr(true);
            setMessageRoleErr("Role Required");
        }

        if (user.firstName === "" || user.lastName === "" || user.email === "" || user.role === "") {
            setRecheckFormMessage('Recheck The Form');
        } else {
            setRecheckFormMessage('');

            try {
                await axios.put(`http://localhost:8080/users/updateUser/${username}`, user);
                
            } catch (error) {
                console.log("Error in updating user: ", error);
            }
        }
    };

    return(
        <Container>
            <Box style={{ textAlign: 'center', }} m={4}>
                <Typography variant="h5" gutterBottom style={{ fontFamily: "Inika", fontSize: 58, fontWeight: "bold", color: "#f7f7f7" }}>
                    Update User
                </Typography>
                <form>
                    <TextField
                    name="firstName"
                    label="First Name"
                    id="filled-search"
                    variant="filled"
                    InputLabelProps={{
                        style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                    }}
                    inputProps={{ style: { color: "#cca4a6", fontFamily: "Inika", fontSize: 20 }}}
                    sx={{ borderRadius: "10px", borderColor: "#cca4a6",
                    '&.Mui-focused': {
                      borderColor: '#314247',
                    }, }}
                    fullWidth
                    required
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    error={firstNameErr}
                    helperText={messageFirstNameErr}/>
                    <br/>
                    <TextField
                    name="lastName"
                    label="Last Name"
                    id="filled-search"
                    variant="filled"
                    InputLabelProps={{
                        style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                    }}
                    inputProps={{ style: { color: "#cca4a6", fontFamily: "Inika", fontSize: 20 }}}
                    sx={{ borderRadius: "10px", borderColor: "#cca4a6"}}
                    fullWidth
                    required
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    error={lastNameErr}
                    helperText={messageLastNameErr}/>
                    <br/>
                    <TextField
                    name="email"
                    label="Email"
                    id="filled-search"
                    variant="filled"
                    InputLabelProps={{
                        style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                    }}
                    inputProps={{ style: { color: "#cca4a6", fontFamily: "Inika", fontSize: 20 }}}
                    sx={{ borderRadius: "10px", borderColor: "#cca4a6"}}
                    fullWidth
                    required
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    error={emailErr}
                    helperText={messageEmailErr}/>
                    <br/>
                    <FormControl fullWidth  variant="standard" >
                        <TextField
                        name="role"
                        select
                        label="Role"
                        InputLabelProps={{
                            style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                        }}
                        inputProps={{ style: { color: "black", fontSize: 20 } }}
                        sx={{ borderRadius: "10px", borderColor: "#cca4a6" }}
                        variant="filled"
                        fullWidth
                        required
                        value={user.role}
                        error={roleErr}
                        helperText={messageRoleErr}
                        onChange={handleFirstDropDownChange}
                        >
                            {roleTypes.map((type) => (
                            <BlackMenuItem key={type} value={type.toLowerCase()}>
                                <span style={{ color: "#cca4a6", fontFamily: "Inika", fontSize: 20 }}>{type}</span>
                            </BlackMenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <br/>
                    <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    color="primary"
                    sx={{
                        m: 3,
                        backgroundColor: "#647973",
                        "&:hover": {
                        backgroundColor: "#314247", 
                        },
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Inika",
                        fontSize: 20,
                        }}>
                            Update
                    </Button>
                    <Button
                    type="submit"
                    variant="contained"
                    onClick={() => navigate('/viewallusers')}
                    color="primary"
                    sx={{
                        m: 3,
                        backgroundColor: "#647973",
                        "&:hover": {
                        backgroundColor: "#314247", 
                        },
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Inika",
                        fontSize: 20,
                        }}>
                            Back
                    </Button>
                    <Typography
                    variant="body2"
                    sx={{
                        color: 'red',
                        fontWeight: 'bold',
                        fontFamily: 'Inika',
                        fontSize: 16,
                    }}>
                        {recheckFormMessage}
                    </Typography>
  
                </form>
            </Box>
        
        </Container>
    );
}
export default UpdateAllUsers;