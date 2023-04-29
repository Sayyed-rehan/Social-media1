import React, { useState } from 'react'
import { Avatar,  Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import { currentUser } from '../../utils/currentUser'
import axios from 'axios'
import UpdateModal from '../../Modals/UpdateModal'
import "./PostCardItems.css"
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { useEffect } from 'react'
import bin from "./../../images/bin.png"





const PostCardItems = (props) => {
  const [liked, setliked] = useState(false)
  const [UserID, setUserID] = useState("")
  const [likedCount, setlikedCount] = useState(0)


  
// to delete the post
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
        const res =   axios.delete(`/deletePostById/?_id=${x}`)
        console.log(res.data);
         swal("Poof! Your post has been deleted!", {
          icon: "success",
        });
      } else {
         swal("Your Post  is safe!");
      }
    });
    location.reload()
  }

// console.log(props.createdAt);

const createdAted = new Date(props.createdAt).toLocaleString(
  'en-US',
  {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  })


 

//get User data by ID
  const fetchDetailsByID = async()=>{
    const res = await axios.get(`/getUserByID?_id=${props.postedBy}`)
    // console.log('id details',res.data.data._id);
    setUserID(res.data.data.name)
  }

  const handlediableBin =async()=>{
    await swal({
      title: "You don't have access to this post",
      icon: "error",
      button: "ok",
    });
  }

  const handleLiked =()=>{
    setlikedCount(likedCount+1)
    setliked(true)
  }

  const handleUnLiked =()=>{
    setlikedCount(likedCount-1)
    setliked(false)
  }
  
useEffect(()=>{fetchDetailsByID()},[])





  return (
    <div>
        <Card sx={{ml:'10px', mr:"10px", mb:"10px"}}>
            <CardHeader 
            avatar={<Avatar>{UserID.split("",1)}</Avatar>}
            title={props.heading}
             subheader={createdAted}
            />
            <CardMedia image={props.img}  component="img"  sx={{ height: "300px", width:"100%", objectFit:"cover"  }}/>
            <CardContent>
                <Typography variant="body2" color="text.secondary">{props.desc}</Typography>
            </CardContent>
           

            <CardActions sx={{display:"flex", justifyContent:"space-evenly", cursor:"pointer"}}>
            <ThumbUpAltOutlinedIcon fontSize='large'  onClick={liked?handleUnLiked:handleLiked} color={liked?'success':'inherit'}  />
            

            {currentUser._id==props.postedBy? 
            <img src={bin} alt='delete' width='30px' onClick={()=>handleDelete(props._id)}  />
            :<img src={bin} width='30px' onClick={handlediableBin}/>}
            <UpdateModal  
            heading={props.heading}
             desc={props.desc}
             img={props.img} 
            id={props._id}
            postedBy={props.postedBy}
            />

            </CardActions>
        </Card>
    </div>
  )
}

export default PostCardItems