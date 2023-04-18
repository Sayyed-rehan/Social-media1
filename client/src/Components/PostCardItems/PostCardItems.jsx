import React from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import { currentUser } from '../../utils/currentUser'
import delete1 from "./../../images/delete1.png"
import axios from 'axios'
import UpdateModal from '../../Modals/UpdateModal'




const PostCardItems = (props) => {

  

  const handleDelete =async(x)=>{
    await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const res =  axios.delete(`http://localhost:5000/deletePostById/?_id=${x}`)
        console.log(res.data);

        swal("Poof! Your imaginary file has been deleted!", {
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

            <CardActions >
            <Button size="small" color="primary">Share</Button>
            <IconButton color='error'>
            <img src='https://img.icons8.com/ios/256/like.png' width='20px' />
            <img src={delete1} alt='delete' width='40px' onClick={()=>handleDelete(props._id)}  />
            <UpdateModal  
            heading={props.heading}
             desc={props.desc}
             img={props.img} 
            id={props._id}/>

            </IconButton>
            </CardActions>
        </Card>
    </div>
  )
}

export default PostCardItems