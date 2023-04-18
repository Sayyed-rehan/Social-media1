import React, { useCallback, useState } from "react";
import { Box,  Divider, TextField,  } from "@mui/material";
import axios from "axios";
import "./Feed.css";
import { useEffect } from "react";
import PostCardItems from "../PostCardItems/PostCardItems";

const Feed = () => {

  
  const [data, setdata] = useState([])

  const fetchPost = async()=>{
    const res = await axios.get("http://localhost:5000/allPost")
    .then((responce)=>{
      setdata(responce.data.data)
    })
    
  }
  
  useEffect(()=>{
    fetchPost()
  },[])
  
 
console.log(data);
  
  



  return (
    <div className="feed-container">
      <Box className="feed-container1">
        <Box className="feed1">
          <TextField variant="outlined" label="serach here..." fullWidth
          sx={{width:"350px"}}  />
        </Box>
          <Divider color='white'/>
          <Divider color='white'/>

          <Box className="feed3">
           {data.map((x,i)=>(
            <PostCardItems key={x._id}
            heading={x.heading}
             desc={x.desc}
             img={x.img} 
             _id={x._id}
            />
           ))}
          </Box>
      </Box>
    </div>
  );
};

export default Feed;
