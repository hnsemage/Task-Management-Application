import React, { useState, useEffect } from 'react';
import { Container, Paper,Button, Typography, Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

// Define a CSS class to remove borders
const noBorder = {
    border: 'none',
  };

function UserPage(){
    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
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
                        Last Name:
                      </Typography>
                    </TableCell>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 17, color: "black", }}>
                        {userData.last_name}
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
                        Password:
                      </Typography>
                    </TableCell>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 17, color: "black", }}>
                        {userData.password}
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
      <Box >
      {userData && userData.records && (
        <TableContainer component={Paper} style={{backgroundColor: "rgba(186, 223, 231, 0.7)", borderRadius:3}} >
          <Table>
            <TableHead >
              <TableRow >
                <TableCell style={{fontFamily: "Inika", fontSize: 17,  fontWeight: "bold",color: "black", textAlign:"center", borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    Task Name
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 17,  fontWeight: "bold",color: "black", textAlign:"center",borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    Username
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 17,  fontWeight: "bold",color: "black", textAlign:"center", borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    Start Date
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 17,  fontWeight: "bold",color: "black", textAlign:"center", borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    End Date
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 17,  fontWeight: "bold",color: "black", textAlign:"center", borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody textAlign={'center'}>
              {userData.records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell style={{fontFamily: "Inika", fontSize: 15, color: "black",  borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    {record.taskName}
                </TableCell>
                  <TableCell style={{fontFamily: "Inika", fontSize: 15, color: "black", borderLeft: "2px solid black", borderBottom:"2px solid black" }}>
                    {record.username}
                </TableCell>
                  <TableCell style={{fontFamily: "Inika", fontSize: 15, color: "black", borderLeft: "2px solid black", borderBottom:"2px solid black" }}>
                    {record.startDate}
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 15, color: "black", borderLeft: "2px solid black", borderBottom:"2px solid black" }}>
                    {record.endDate}
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 15, color: "black", borderLeft: "2px solid black", borderBottom:"2px solid black" }}>
                    {record.taskStatus}
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      </Box>
      <Box textAlign="center">
      <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/login')}
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/taskCreate`)}
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
          Create Home
        </Button>
      </Box>
        </Container>
    );
}
export default UserPage;