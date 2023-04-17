import React, { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, TextField, Typography } from "@mui/material";
import axios from "axios";
import "./Feed.css";
import addpost from "./../../images/addpost.png"
import update from "./../../images/update.png"
import deleting from "./../../images/deleting.png"
import { useEffect } from "react";
import PostCardItems from "../PostCardItems/PostCardItems";

const Feed = () => {

  
  const [data, setdata] = useState([])
  
  const fetchPost = async()=>{
    const res = await axios.get("http://localhost:5000/allPost")
    console.log("post data",res.data.data);  
    setdata(res.data.data)
  }
  
  useEffect(()=>{fetchPost()},[data])





  return (
    <div className="feed-container">
      <Box className="feed-container1">
        <Box className="feed1">
          <TextField variant="outlined" label="serach here..." fullWidth
          sx={{width:"350px"}}  />
        </Box>
          <Divider color='white'/>
          <Box className="feed2" >
          <img src={addpost}/>
          <img src={deleting}/>
          <img src={update}/>

          </Box>
          <Divider color='white'/>
          <Box className="feed3">
           {data.map((x,i)=>(
            <PostCardItems 
            heading={x.heading}
             desc={x.desc}
             img={x.img} 
            />
           ))}
          </Box>
      </Box>
    </div>
  );
};

export default Feed;
