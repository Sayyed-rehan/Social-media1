import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";
import { currentUser } from "../../utils/currentUser";
import { loginUser } from "../../utils/loginUser";
import "./About.css"
import adduser from "./../../images/addfriend.png"
import location2 from "./../../images/location2.png"
const WeatherKey = import.meta.env.VITE_WEATHER_KEY


const About = () => {
    const [city, setCity] = useState('Ahmednagar');
    const [temp, setTemp] = useState('');
    const [inpCity, setInpCity] = useState('');
    const [humidity, setHumidity] = useState('');
    const [description, setDescription] = useState('');

  

// async function loadData() {
//     // let city = "ahmednagar"
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentUser.city?currentUser.city:"Ahmednagar"}&appid=${WeatherKey}`;
//     const response = await axios.get(url);

//     //fetching temp
//     const tempCel = Math.round(response.data.main.temp - 273.15);
//     setTemp(`${tempCel} °C`);

//     //fetching humidity
//     setHumidity(`${response.data.main.humidity} %`);

//     //fetching description
//     setDescription(response.data.weather[0].description);
//   }

//   loadData();

  // logout
  const handleLogout=async()=>{
    await swal({
      title: "Logout Successfully",
      icon: "success",
    });
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }


  //get data by city for recommedation
  const [UsercityData,setUsercityData] = useState([])
  const fetchDataByCity = async () => {
    const res = await axios.get(`http://localhost:5000/getUserbyCity?city=${currentUser.city}`);
    // console.log("from coonect",res.data.data);
    setUsercityData(res.data.data);
  };

  const handleAddUser=async()=>{
    await swal({
      title: "Added to Friend list Successfully",
      icon: "success",
    });
  }

  useEffect(()=>{
    loginUser()
    fetchDataByCity()
    },[])

  return (
    <div className="about-container">
    {currentUser?
    <Box className="about-box" >

      <Typography variant='h3'  gutterBottom  className="about-box-header">Profile</Typography>
      <Divider variant="middle"  />
      <Box className="about1">
      <Avatar sx={{ width: 56, height: 56 , bgcolor:"green"}}>{currentUser.name.split("",1)}</Avatar>
      <Stack direction='row' sx={{display:"flex", alignItems:"center"}} spacing={1.5}>
        <img src='https://img.icons8.com/doodle/1x/name.png' width='30px'/>
      <Typography variant='h5' >{currentUser.name}</Typography>
      </Stack>
      <Stack direction='row' sx={{display:"flex", alignItems:"center"}} spacing={1.5}>
      <img src='https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/1x/
      external-email-interface-kiranshastry-lineal-color-kiranshastry.png'
        width='25px'
      />
      <Typography variant='body1'>{currentUser.email}</Typography>
      </Stack>
      <Stack direction='row' sx={{display:"flex", alignItems:"center"}} spacing={1.5}>
        <img src='https://img.icons8.com/dusk/1x/phone.png' width='30px'/>
      <Typography variant='body1'>+91 {currentUser.phone}</Typography>  
      </Stack>
      <Stack direction='row' sx={{display:"flex", alignItems:"center"}} spacing={1.5}>
        <img src={location2} width='30px'/>
      <Typography variant='body1'>{currentUser.city}</Typography>  
      </Stack>

      <Box className="weather">
      <Divider/>

        <Typography variant='h5' fontWeight='bold' sx={{display:"flex",justifyContent:"center" ,alignItems:"center"}}>Recommended</Typography>
        <Divider  variant="middle"/>

        {UsercityData && UsercityData.length>0  ? 
        (UsercityData.filter(a=>a._id!=currentUser._id).map((x,i)=>(

            <Box sx={{pt:"20px"}} key={x._id}>
              <Stack direction='row' spacing={1}>
                <Box>
                  <Avatar sx={{ width: 50, height: 50, bgcolor: '#5c6bc0' }} >{x.name.split("",1)}</Avatar>
                </Box>
                <Box>
                <Typography sx={{display:"flex", alignItems:"center",}} variant='body2'>{x.name}</Typography>
                <Typography sx={{display:"flex", alignItems:"center",}} variant='body2'>{x.email}</Typography>
                </Box>
                <Box sx={{display:"flex", alignItems:"center", pl:"15px"}}>
                  <img src={adduser} width='25' onClick={handleAddUser}/>
                </Box>
              </Stack>
            </Box>
            
        )))
        :<Typography>No data found</Typography>}

    
      </Box>
      <Button variant='contained' color='error' sx={{display:"felx", justifyContent:"center", alignItems:"center", mt:"20px"}} onClick={handleLogout}>LogOut</Button>
      </Box>
    </Box>
    :<Typography>Needs to login</Typography>}
    </div>
  );
};

export default About;
