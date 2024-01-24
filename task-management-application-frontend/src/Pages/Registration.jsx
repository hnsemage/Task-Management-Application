import React, { useState } from 'react';
import { Container, Typography, TextField, Button,Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

function Registration(){

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [firstNameErr, setFirstNameErr] = useState(false);
    const [lastNameErr, setLastNameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [usernameErr, setUsernameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const [messageFirstNameErr, setMessageFirstNameErr] = useState("");
    const [messageLastNameErr, setMessageLastNameErr] = useState("");
    const [messageEmailErr, setMessageEmailErr] = useState("");
    const [messageUsernameErr, setMessageUsernameErr] = useState("");
    const [messagetPasswordErr, setMessagetPasswordErr] = useState("");

    const [recheckFormMessage, setRecheckFormMessage] = useState('');

    const handleSubmit = async (e) => {
    
    
        setFirstNameErr(false);
        setLastNameErr(false);
        setEmailErr(false);
        setUsernameErr(false);
        setPasswordErr(false);
    
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
          setMessageEmailErr("Type Required");
        } else {
          setMessageEmailErr("");
        }
    
        if (username === "") {
          setUsernameErr(true);
          setMessageUsernameErr("Value Required");
        }else {
          setMessageUsernameErr("");
        }
    
        if (password === "") {
          setPasswordErr(true);
          setMessagetPasswordErr("Value Required");
        }else {
          setMessagetPasswordErr("");
        }
        
        if (firstName === "" || lastName === "" || email === "" || username === "" || password === "") {
          setRecheckFormMessage('Recheck The Form');
        } else {
          setRecheckFormMessage('');
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        setPassword(hashedPassword);

        try{
            //Send the registeration data to the backend
            const response = await axios.post(
                'http://localhost:8080/createUser',
                {
                    firstName,
                    lastName,
                    email,
                    username,
                    password: hashedPassword,  // Send hashed password to the backend
                }
            );

            console.log('Registration successful:', response.data);

            //Redirect to the login page
            navigate('/');
        }catch (error){
            console.log('Registration failed:',error);
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
                    sx={{ borderRadius: "10px", borderColor: "#cca4a6" }}
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
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/')}
                    sx={{
                        m: 3,
                        width: '20ch',
                        backgroundColor: "#647973",
                        "&:hover": {
                        backgroundColor: "#314247", // Set the background color on hover
                        },
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Inika",
                        fontSize: 20,
                    }}>
                        Login
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