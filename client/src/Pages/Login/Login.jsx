import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import "./Login.css"
import swal from 'sweetalert'
import {useNavigate}from 'react-router-dom'

const Login = () => {
    const nav = useNavigate()
    const [disable, setdisable] = useState(true)

    const [user, setuser] = useState({
        email:"", password:""
    })

    const handleInput =(e)=>{
        setuser({...user,[e.target.name]:e.target.value})
        setdisable(false)
    }

    const handleLogin=async()=>{
        const responce = await axios.post("http://localhost:5000/login",{
            email:user.email,
            password:user.password
        })
        console.log(responce.data);
        
        if(responce.data.success){
            await swal({
                title: "Login Successfull",
                text: "You are ready to GO",
                icon: "success",
                button: "ok",
              });
              localStorage.setItem("currentUser", JSON.stringify(responce.data.data))
              setuser({email:"", password:""})
              window.location.href = "/"
        }else{
            await swal({
                title: "invalid",
                icon: "error",
                button: "ok",
              });
        }
    }

    const handleRegister =()=>{
      nav("/sigin")
    }

  return (
    <div className="login-container">
      <Box className='l1'>
      <Typography variant='h3' sx={{pb:'20px'}} color='#ef5350'>Login.</Typography>
        <Stack spacing={3} className='l2'>
          <TextField variant="outlined" label='Email' name="email" value={user.email} onChange={handleInput} type='email'/>
          <TextField variant="outlined" label='Password' name="password" value={user.password} onChange={handleInput} type='password'/>
        </Stack>
        <Box sx={{pt:"30px", display:"flex", gap:"20px"}}>
        <Button onClick={handleLogin} variant='contained' color='success' disabled={disable}>Login</Button>
        <Button variant='contained' onClick={handleRegister}>Register</Button>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
