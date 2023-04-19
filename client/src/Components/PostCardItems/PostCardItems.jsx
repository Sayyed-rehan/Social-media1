import React, { useState } from 'react'
import { Avatar,  Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import { currentUser } from '../../utils/currentUser'

import axios from 'axios'
import UpdateModal from '../../Modals/UpdateModal'
import deletes from "./../../images/deletes.png"

import "./PostCardItems.css"
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';



const PostCardItems = (props) => {
  const [liked, setliked] = useState(false)

  

  const handleDelete =async(x)=>{
    await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const res =  axios.delete(`http://localhost:5000/deletePostById/?_id=${x}`)
        console.log(res.data);

        swal("Poof! Your post has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }



console.log('Postcard',props._id);


  return (
    <div>
        <Card sx={{ml:'10px', mr:"10px", mb:"10px"}}>
            <CardHeader 
            avatar={<Avatar>{currentUser.name.split("",1)}</Avatar>}
            title={props.heading}
             subheader="September 14, 2016"
            />
            <CardMedia image={props.img}  component="img"  sx={{ height: 300 }}/>
            <CardContent>
                <Typography variant="body2" color="text.secondary">{props.desc}</Typography>
            </CardContent>
            <Divider/>

            <CardActions sx={{display:"flex", justifyContent:"space-evenly", cursor:"pointer"}}>
            <ThumbUpAltOutlinedIcon fontSize='large' onClick={()=>setliked(true)} color={liked?'success':'inherit'}/>
            <img src={deletes} alt='delete' width='35px' onClick={()=>handleDelete(props._id)}  />
            <UpdateModal  
            heading={props.heading}
             desc={props.desc}
             img={props.img} 
            id={props._id}/>

            </CardActions>
        </Card>
    </div>
  )
}

export default PostCardItems