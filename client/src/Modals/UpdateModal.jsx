import React, { useState } from "react";
import { Box, IconButton,  Typography, Modal, TextField, Button, Stack } from "@mui/material";
import axios from 'axios'
import swal from 'sweetalert'
import edit from "./../images/edit.png"
import { currentUser } from "../utils/currentUser";
import disableedit from "./../images/disableedit.jpg"

const UpdateModal = (props) => {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);


  const [inputs, setinputs] = useState({
    desc:(props.desc),heading:(props.heading), image:(props.img)})
  
    const handleInput = (e)=>{
        setinputs({...inputs,[e.target.name]:e.target.value})
    }

  const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400,
   boxShadow: 24, p: 4, borderRadius:4, bgcolor:"#fffde7"};


    const handleUpdate = async(x)=>{

      await swal({
        title: "Are you sure?",
        text: "Once updated, you will not be able to recover this previous post!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          const res = axios.patch(`http://localhost:5000/updatePost?_id=${x}`,{
            heading:inputs.heading,
            desc:inputs.desc,
            img:inputs.image
          })
          // console.log(res.data);
          
          swal("Poof! Your post   has been updated!", {
            icon: "success",
          });
          location.reload()
        } else {
          swal("Your post is safe!");
        }
        setisDrawerOpen(false)
      });
    }

    const hanldeDisableEdit=async()=>{
      await swal({
        title: "Cannot edit this post",
        icon: "error",
        button: "ok",
      });
      setisDrawerOpen(false)
    }
  
    // console.log(props.heading);
  return (
    <>
      <IconButton size="large" edge="start" color="black"
        onClick={currentUser._id==props.postedBy? () => setisDrawerOpen(true):() => hanldeDisableEdit()}>

      <img src={edit} width='35px'/>
       {/* {currentUser._id==props.postedBy? 
       :<img src={disableedit} width='55px' onClick={hanldeDisableEdit}/>} */}
      </IconButton>
      <Modal open={isDrawerOpen} onClose={() => setisDrawerOpen(false)} aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">




        <Box  sx={style} boxShadow={12} >
        <Typography variant='h4' sx={{display:"flex", justifyContent:"center"}}>Edit post</Typography>
        <Stack spacing={4} sx={{pt:2, pb:2}}>
        <TextField variant="outlined" label='Heading' name="heading" value={inputs.heading} onChange={handleInput} type='heading'/>
        <TextField variant="outlined" label='Desc' name="desc" value={inputs.desc} onChange={handleInput} type='desc' multiline/>
        <TextField variant="outlined" label='Images URL' name="image" value={inputs.image} onChange={handleInput} type='img' multiline/>
        </Stack>

        <Box sx={{display:"flex", justifyContent:"center"}}>

        <Button onClick={()=>handleUpdate(props.id)} variant='contained'> Update</Button>
        </Box>

        </Box>
      </Modal>
    </>
  );
};

export default UpdateModal;
