import React, { useState } from "react";
import { Box, Drawer, IconButton, List, Typography, Modal, TextField, Button } from "@mui/material";
import update1  from "./../images/update1.png";
import axios from 'axios'

const UpdateModal = (props) => {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);


  const [inputs, setinputs] = useState({
    desc:(props.desc),heading:(props.heading), image:(props.img)})
  
    const handleInput = (e)=>{
        setinputs({...inputs,[e.target.name]:e.target.value})
    }

  const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper',
  border: '2px solid #000', boxShadow: 24, p: 4,};


    const handleUpdate = async(x)=>{
        const res =await axios.patch(`http://localhost:5000/updatePost?_id=${x}`,{
          heading:inputs.heading,
          desc:inputs.desc,
          img:inputs.image
        })
        console.log(res.data);
        // location.reload()
    }
  
    console.log(props.heading);
  return (
    <>
      <IconButton size="large" edge="start" color="black"
        onClick={() => setisDrawerOpen(true)}>
        <img src={update1} />
      </IconButton>
      <Modal open={isDrawerOpen} onClose={() => setisDrawerOpen(false)} aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">




        <Box  sx={style}>
        <Typography>Update</Typography>
        <TextField variant="outlined" label='Heading' name="heading" value={inputs.heading} onChange={handleInput} type='heading'/>
        <TextField variant="outlined" label='Desc' name="desc" value={inputs.desc} onChange={handleInput} type='desc'/>
        <TextField variant="outlined" label='Images' name="image" value={inputs.image} onChange={handleInput} type='img'/>
        <Button onClick={()=>handleUpdate(props.id)}>Update</Button>

        </Box>
      </Modal>
    </>
  );
};

export default UpdateModal;
