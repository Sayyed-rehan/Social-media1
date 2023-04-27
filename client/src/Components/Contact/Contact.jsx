import React, { useState } from "react";
import axios from "axios";
import { Avatar, AvatarGroup, Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, SpeedDial, Stack, Tooltip, Typography,} from "@mui/material";
import { useEffect } from "react";
import "./Contact.css"
import trend from "./../../images/trend.png"
import person from "./../../images/person1.png"
import email from "./../../images/email.png"
import call from "./../../images/call.png"
import location from "./../../images/location.png"
import {currentUser} from "./../../utils/currentUser"
import ConnetModal from "../../Modals/ConnetModal";
const API = import.meta.env.VITE_SOME_KEY












const Contact = () => {
  const [soccerData, setsoccerData] = useState([]);
  const [DailogOpen, setDailogOpen] = useState(false)
  const [UsercityData, setUsercityData] = useState([])
  const [UserById, setUserById] = useState([])

// console.log("api",import.meta.env.VITE_SOME_KEY);

  const getData = async () => {
    const res = await axios.get(
      "https://free-football-soccer-videos.p.rapidapi.com/",
      {
        headers: {"X-RapidAPI-Key": (import.meta.env.VITE_SOME_KEY),
      "X-RapidAPI-Host": "free-football-soccer-videos.p.rapidapi.com"},
      }
    );
    setsoccerData(res.data);
  };

  const fetchDataByCity = async()=>{
    const res = await axios.get(`http://localhost:5000/getUserbyCity?city=${currentUser.city}`)
    console.log(res.data.data);
    setUsercityData(res.data.data)
  }

  // const fetchUserByID = async(x)=>{
  //   setDailogOpen(true)
  //   const res = await axios.get(`http://localhost:5000/getUserByID?_id=${x}`)
  //   console.log("fetchUserByID",res.data.data);
  //   setUserById(res.data.data)
  // }



  useEffect(() => {
    getData();
    // fetchDataByCity()
  }, []);

 


  return (
    <div>
    <Box className='contact-container'>
    <Box className="c1" boxShadow={12}>
    <Typography variant="h5" fontWeight='bold' sx={{pb:"10px", pt:"10px"}}>Catch your favourite actions</Typography>
    <Divider variant='middle'/>
      <List>
        {soccerData.map((x,i)=>{
          if(i<4){
            return(
              <Box className='c11' key={i}>
                <ListItemIcon sx={{display:"flex", justifyContent:"center"}}>
                  <img src={x.thumbnail} width='70'/>
                </ListItemIcon>
                <ListItem >
                  <ListItemText primary={x.title}  sx={{display:"flex", justifyContent:"center"}} />
                </ListItem>
                <Link href={x.url} variant='caption' sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <img src={trend} width='20' style={{padding:"6px"}}/>
                  {x.url}
                </Link>
              </Box>
            )
          }
        })}
      </List>
    </Box>
    <Box className="c2">
    {/* <ConnetModal/> */}

    </Box>
    </Box>
    </div>
  );
};

export default Contact;
