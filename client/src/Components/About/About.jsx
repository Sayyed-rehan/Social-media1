import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";
import { currentUser } from "../../utils/currentUser";
import { loginUser } from "../../utils/loginUser";
import "./About.css"

const About = () => {
    const [city, setCity] = useState('Ahmednagar');
    const [temp, setTemp] = useState('');
    const [inpCity, setInpCity] = useState('');
    const [humidity, setHumidity] = useState('');
    const [description, setDescription] = useState('');

   useEffect(()=>{
   loginUser()
   },[])

//    import axios from "axios";
async function loadData() {
    // let city = "ahmednagar"
    var APIKEY = "e9e36cf5a2bbf404c59aeeb1f4b710e0"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentUser.city?currentUser.city:"Ahmednagar"}&appid=${APIKEY}`;
    const response = await axios.get(url);

    //fetching temp
    const tempCel = Math.round(response.data.main.temp - 273.15);
    setTemp(`${tempCel} °C`);

    //fetching humidity
    setHumidity(`${response.data.main.humidity} %`);

    //fetching description
    setDescription(response.data.weather[0].description);
  }

  loadData();

  // console.log(description);
  const handleLogout=async()=>{
    await swal({
      title: "Logout Successfully",
      icon: "success",
    });
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }

  return (
    <div className="about-container">
    {currentUser?
    <Box className="about-box" boxShadow={12}>

      <Typography variant='h3'  gutterBottom  sx={{display:"flex", alignItems:"center", justifyContent:"center", pt:"10px"}}>Profile</Typography>
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

      <Box className="weather">
      <Divider/>
      <Typography variant='h5' fontWeight='bold'>Weather</Typography>
        <Typography sx={{display:"flex", alignItems:"center", gap:"10px"}}>
        <img src='https://img.icons8.com/color/1x/marker.png' width='20px'/>
        {currentUser.city?currentUser.city:"Ahmednagar"}</Typography>
        <Typography sx={{display:"flex", alignItems:"center", gap:"10px"}}>
        <img src='https://img.icons8.com/arcade/1x/temperature.png'width='30px'/>
        {temp}</Typography>
        {/* <Typography>{inpCity}</Typography> */}
        <Typography sx={{display:"flex", alignItems:"center",  gap:"10px"}}>
        <img src='https://img.icons8.com/officel/1x/humidity.png' width='35px'/>
        {humidity}</Typography>
        <Typography sx={{display:"flex", alignItems:"center",  gap:"10px"}}>
        <img src='https://img.icons8.com/sf-black-filled/1x/clouds.png' width='30px'/>
        {description}</Typography>
    
      </Box>
      <Button variant='contained' color='error' sx={{display:"felx", justifyContent:"center", alignItems:"center", mt:"20px"}} onClick={handleLogout}>LogOut</Button>
      </Box>
    </Box>
    :<Typography>Needs to login</Typography>}
    </div>
  );
};

export default About;
