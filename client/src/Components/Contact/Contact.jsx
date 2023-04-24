import React, { useState } from "react";
import axios from "axios";
import { Avatar, AvatarGroup, Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Stack, Tooltip, Typography,} from "@mui/material";
import { useEffect } from "react";
import "./Contact.css"
import trend from "./../../images/trend.png"
import person from "./../../images/person1.png"
import email from "./../../images/email.png"
import call from "./../../images/call.png"
import location from "./../../images/location.png"
import {currentUser} from "./../../utils/currentUser"









const Contact = () => {
  const [soccerData, setsoccerData] = useState([]);
  const [DailogOpen, setDailogOpen] = useState(false)
  const [UsercityData, setUsercityData] = useState([])

  const handleClickOpen=()=>{
    setDailogOpen(true)
  }

  const getData = async () => {
    const res = await axios.get(
      "https://free-football-soccer-videos.p.rapidapi.com/",
      {
        headers: {
          "X-RapidAPI-Key":
            "c045737265msh1b8b44c37f9d687p121d2bjsn6246cf5dbcf5",
          "X-RapidAPI-Host": "free-football-soccer-videos.p.rapidapi.com",
        },
      }
    );
    setsoccerData(res.data);
  };

  const fetchDataByCity = async()=>{
    const res = await axios.get(`http://localhost:5000/getUserbyCity?city=${currentUser.city}`)
    console.log(res.data.data);
    setUsercityData(res.data.data)
  }

  console.log(UsercityData);

  useEffect(() => {
    getData();
    fetchDataByCity()
  }, []);

  const longText = currentUser;


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
              <Box className='c11'>
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
    {/* <Box className="c2">
    <AvatarGroup  max={5}>
      {UsercityData.map((x,i)=>(
        <Box>
          <Avatar onClick={handleClickOpen}>{x.name.split("",1)}</Avatar>
          <Dialog open={DailogOpen} onClose={()=>setDailogOpen(false)} selectedValue={UsercityData}>
            <DialogTitle>Profile</DialogTitle>
            <DialogContent sx={{display:"flex", alignItems:"center", gap:"10px"}}><img src={person} width='20'/>{x.name}</DialogContent>
            <DialogContent sx={{display:"flex", alignItems:"center", gap:"10px"}}><img src={email} width='20'/>{x.email}</DialogContent>
            <DialogContent sx={{display:"flex", alignItems:"center", gap:"10px"}}><img src={call} width='20'/>{x.phone}</DialogContent>
            <DialogContent sx={{display:"flex", alignItems:"center", gap:"10px"}}><img src={location} width='20'/>{x.city}</DialogContent>
          </Dialog>
        </Box>
      ))}
    </AvatarGroup>
    </Box> */}
    </Box>
    </div>
  );
};

export default Contact;
