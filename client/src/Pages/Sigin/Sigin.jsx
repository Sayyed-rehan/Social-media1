import React, { useState, useEffect } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import "./Sigin.css";
import swal from "sweetalert"
import axios from 'axios'
import {useNavigate}from 'react-router-dom'
import { currentUser } from "../../utils/currentUser";

const Sigin = () => {
  const Nav = useNavigate()

    const [user, setuser] = useState({
        name:"", email:"", phone:"", city:"", password:""
    })

    const handleInput=(e)=>{
        setuser({...user,[e.target.name]:e.target.value})
    }

    //to sigin register
    const handleSigin=async()=>{

        const responce = await axios.post("http://localhost:5000/sigin",{
            name:user.name,
            phone:user.phone,
            email:user.email,
            city:user.city,
            password:user.password
        })
        console.log(responce.data);
        if(responce.data.success){
          await swal({
            title: "Sigin Done",
            text: "You are ready to GO",
            icon: "success",
            button: "ok",
          });
          Nav("/login")
        }else{
          await swal({
            title:"Some Fields are empty",
            text:responce.data.mess,
            icons:"info"
          })
        }
        
          setuser({name:"", email:"", phone:"", password:""})
    }

    useEffect(async()=>{
      if(currentUser){
        await swal({
          title:"you are logined",
          icon:"info"
        })
        window.location.href='/'
      }
  },[])

  return (
    <div className="sigin-conainer">
      
      <Box className="s2" boxShadow={12}   >
      <Typography variant='h3'sx={{display:"flex", justifyContent:"center", pb:'20px'}} color='#66bb6a'>Sigin.</Typography>
        <Stack spacing={2}>
          <TextField label="Name"   required variant="outlined" name="name" value={user.name} onChange={handleInput}/>
          <TextField label="Email"  required type={"email"} variant="outlined" name="email" value={user.email} onChange={handleInput}/>
          <TextField label="Phone"  required type={"phone"} variant="outlined" name="phone" value={user.phone} onChange={handleInput}/>
          <TextField label="City"  required type={"city"} variant="outlined" name="city" value={user.city} onChange={handleInput}/>
          <TextField label="Password"  required type={"password"} variant="outlined" name="password" value={user.password} onChange={handleInput}/>
        </Stack>
        <Box className='s2-button'>
          <Button variant="contained" onClick={handleSigin}>Sigin</Button>
        </Box>
      </Box>
    </div>
  );
};

export default Sigin;
