import React, { useState } from "react";
import axios from "axios";
import { Avatar, AvatarGroup, Box,Divider, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, SpeedDial, Stack, Tooltip, Typography,} from "@mui/material";
import { useEffect } from "react";
import "./Contact.css"
import trend from "./../../images/trend.png"
import {currentUser} from "./../../utils/currentUser"
// import ConnetModal from "../../Modals/ConnetModal";
const API = import.meta.env.VITE_SOME_KEY












const Contact = () => {
  const [soccerData, setsoccerData] = useState([]);


  //get scoocer data
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







  useEffect(() => {
    getData();
  }, []);

 


  return (
    <div>
    <Box className='contact-container'>
    <Box className="c1" >
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

    </Box>
    </Box>
    </div>
  );
};

export default Contact;
