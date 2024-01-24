import React, { useState } from 'react';
import { Container,Button, TextField, FormControl, Box, Typography, MenuItem,styled } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const BlackMenuItem = styled(MenuItem)({
  backgroundColor: '#314247', // Set the background color to black
  '&:hover': {
    backgroundColor: '#314247', // Keep the background color black on hover
  },
  '&.Mui-selected': {
    backgroundColor: '#314247', // Set the selected item background color
  },
  
});


function Registration(){

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
  
    const [firstNameErr, setFirstNameErr] = useState(false);
    const [lastNameErr, setLastNameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [usernameErr, setUsernameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [roleErr, setRoleErr] = useState(false);

    const [messageFirstNameErr, setMessageFirstNameErr] = useState("");
    const [messageLastNameErr, setMessageLastNameErr] = useState("");
    const [messageEmailErr, setMessageEmailErr] = useState("");
    const [messageUsernameErr, setMessageUsernameErr] = useState("");
    const [messagetPasswordErr, setMessagetPasswordErr] = useState("");
    const [messageRoleErr, setMessageRoleErr] = useState("");

    const [recheckFormMessage, setRecheckFormMessage] = useState('');

    const [roleTypes, setRoleTypes] = useState(['Admin', 'User']);

    const handleFirstDropDownChange=(event) =>{
      const selectedType = event.target.value;
      setRole(selectedType);}

    const handleSubmit = async (e) => {
    
      e.preventDefault();
    
        setFirstNameErr(false);
        setLastNameErr(false);
        setEmailErr(false);
        setUsernameErr(false);
        setPasswordErr(false);
        setRoleErr(false);
    
        if (firstName === "") {
          setFirstNameErr(true);
          setMessageFirstNameErr("First Name Required");
        } else {
          setMessageFirstNameErr("");
        }
    
        if (lastName === "") {
          setLastNameErr(true);
          setMessageLastNameErr("Last Name Required");
        } else {
          setMessageLastNameErr("");
        }
    
        if (email === "") {
          setEmailErr(true);
          setMessageEmailErr("Email Required");
        } else {
          setMessageEmailErr("");
        }
    
        if (username === "") {
          setUsernameErr(true);
          setMessageUsernameErr("Username Required");
        }else {
          setMessageUsernameErr("");
        }
    
        if (password === "") {
          setPasswordErr(true);
          setMessagetPasswordErr("Password Required");
        }else {
          setMessagetPasswordErr("");
        }

        if (role === "") {
          setRoleErr(true);
          setMessageRoleErr("Role Required");
        }else {
          setMessageRoleErr("");
        }
        
        if (firstName === "" || lastName === "" || email === "" || username === "" || password === "" || role ==="") {
          setRecheckFormMessage('Recheck The Form');
        } else {
          setRecheckFormMessage('');
        }


        try {
          // Send the registration data to the backend
          const response = await axios.post(
              'http://localhost:8080/users/createUser',
              {
                  firstName,
                  lastName,
                  email,
                  username,
                  password,
                  role
              }
          );
      
          console.log('Registration successful:', response.data);
          navigate('/');
      
      } catch (error) {
          if (error.response && error.response.status === 409) {
              // HTTP status 409 indicates a conflict, meaning the username already exists
              console.error('Registration failed. Username already exists.');
              setUsernameErr(true);
              setMessageUsernameErr('Username already exists. Please choose another.');
          } else {
              console.error('Registration failed:', error);
              setUsernameErr(false);
              setMessageUsernameErr(''); // Clear any previous username error messages
          }
      }
      
    }

    return(
        <Container>
            <Box textAlign="center" m={4}>
                <Typography variant="h5" gutterBottom style={{ fontFamily: "Inika", fontSize: 58, fontWeight: "bold", color: "#f7f7f7" }}>
                    Register
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={lastNameErr}
                    helperText={messageLastNameErr}/>
                    <br/>
          
                    <TextField
                    name="email"
                    type="email"
                    label="Email"
                    id="filled-search"
                    variant="filled"
                    InputLabelProps={{
                        style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                    }}
                    inputProps={{ style: { color: "#cca4a6", fontFamily: "Inika", fontSize: 20 }}}
                    sx={{ borderRadius: "10px", borderColor: "#cca4a6" }}
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailErr}
                    helperText={messageEmailErr}/>
                    <br/>
                    <TextField
                    name="username"
                    label="Username"
                    id="filled-search"
                    variant="filled"
                    InputLabelProps={{
                        style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                    }}
                    inputProps={{ style: { color: "#cca4a6", fontFamily: "Inika", fontSize: 20 }}}
                    sx={{ borderRadius: "10px", borderColor: "#cca4a6" }}
                    fullWidth
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={usernameErr}
                    helperText={messageUsernameErr}/>
                    <br/>
                    <TextField
                    name="password"
                    type="password"
                    label="Password"
                    id="filled-search"
                    variant="filled"
                    InputLabelProps={{
                        style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                    }}
                    inputProps={{ style: { color: "#cca4a6", fontFamily: "Inika", fontSize: 20 }}}
                    sx={{ borderRadius: "10px", borderColor: "#cca4a6" }}
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordErr}
                    helperText={messagetPasswordErr}
                    /><br/>
                    <FormControl fullWidth  variant="standard" >
                      <TextField
                      select
                      label="Role"
                      InputLabelProps={{
                        style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                      }}
                      inputProps={{ style: { color: "black", fontSize: 20 } }}
                      sx={{ borderRadius: "10px", borderColor: "#cca4a6" }}
                      id="filled-search"
                      variant="filled"
                      name="role"
                      value={role}
                      required
                      error={roleErr}
                      helperText={messageRoleErr}
                      onChange={handleFirstDropDownChange} >
                        {roleTypes.map((type) => (
                        <BlackMenuItem key={type} value={type}>
                          <span style={{ color: "#cca4a6",fontFamily: "Inika", fontSize: 20 }}>{type}</span>
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
                            Register
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
export default Registration;