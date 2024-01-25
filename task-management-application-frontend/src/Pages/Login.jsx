import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, FormControl } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [messageUsernameErr, setMessageUsernameErr] = useState("");
  const [messagePasswordErr, setMessagePasswordErr] = useState("");

  const handleLogin = async () => {
    console.log("Handle login function is called");
    setUsernameErr(false);
    setPasswordErr(false);

    if (username === "") {
      setUsernameErr(true);
      setMessageUsernameErr("Username Required");
    } else {
      setMessageUsernameErr("");
    }

    if (password === "") {
      setPasswordErr(true);
      setMessagePasswordErr("Password Required");
    } else {
      setMessagePasswordErr("");
    }

    setError(""); // Clear any previous error messages
    
    if(username && password){
        try{
            const response = await axios.post(
                "http://localhost:8080/users/login",
                {
                    username:username,
                    password:password,
                });

                const role = response.data;

                //Handle role as needed
                console.log("Role:",role);

                //Redirect based on the role
                if(role === "admin"){
                  localStorage.setItem("username", username);
                    navigate("/adminPage");
                }else if(role === "user"){
                  localStorage.setItem("username", username);
                    navigate("/userPage");
                }  
        }catch (error){
            console.error("Error during login:", error);
            setError("Login failed. Please try again.")
        }
    }
  };

  return (
    <div>
       
      <Container >
        <Box textAlign="center" m={4}>
          <Typography
            variant="h3"
            style={{
              fontFamily: "Inika",
              fontSize: 58,
              fontWeight: "bold",
              color: "#f7f7f7",
            }}
            component="div"
            gutterBottom
          >
            Login
          </Typography>
        </Box>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl fullWidth sx={{ m: 2, width: "50ch" }} variant="standard">
            <TextField
              label={"Username"}
              InputLabelProps={{
                style: {
                  color: "#cca4a6",
                  fontWeight: "bold",
                  fontFamily: "Inika",
                  fontSize: 20,
                },
              }}
              inputProps={{
                style: {
                  color: "#cca4a6",
                  fontFamily: "Inika",
                  fontSize: 20,
                },
              }}
              sx={{ borderRadius: "10px", borderColor: "#cca4a6" }}
              variant="filled"
              name="value01"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              error={usernameErr}
              helperText={messageUsernameErr}
            />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2, width: "50ch" }} variant="standard">
            <TextField
              label={"Password"}
              InputLabelProps={{
                style: {
                  color: "#cca4a6",
                  fontWeight: "bold",
                  fontFamily: "Inika",
                  fontSize: 20,
                },
              }}
              inputProps={{
                style: {
                  color: "#cca4a6",
                  fontFamily: "Inika",
                  fontSize: 20,
                },
              }}
              sx={{ borderRadius: "10px", borderColor: "#cca4a6" }}
              variant="filled"
              name="value01"
              value={password}
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              error={passwordErr}
              helperText={messagePasswordErr}
            />
          </FormControl>
        </form>
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
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
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/register")}
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
            }}
          >
            Register
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/taskCreate")}
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
            }}
          >
            Create Task
          </Button>
          {error && (
            <Typography
              variant="body2"
              sx={{
                color: "#BADFE7",
                fontWeight: "bold",
                fontFamily: "Inika",
                fontSize: 16,
                mt: 2,
              }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </Container>
      
    </div>
  );
}
export default Login;
