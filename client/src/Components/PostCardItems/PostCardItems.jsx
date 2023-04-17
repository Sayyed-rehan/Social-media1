import React from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import { currentUser } from '../../utils/currentUser'
// import FavoriteIcon from '@mui/icons-material/Favorite';

const PostCardItems = (props) => {
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
            <CardActions>
            <Button size="small" color="primary">Share</Button>
            <IconButton color='error'>
            <img src='https://img.icons8.com/ios/256/like.png' width='20px' />
            </IconButton>
            </CardActions>
        </Card>
    </div>
  )
}

export default PostCardItems