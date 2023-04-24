import React, { useCallback, useState } from "react";
import { Box,  Divider, IconButton, TextField,  } from "@mui/material";
import axios from "axios";
import "./Feed.css";
import { useEffect } from "react";
import PostCardItems from "../PostCardItems/PostCardItems";
import AddModal from "../../Modals/addModal";


const Feed = () => {

  
  const [data, setdata] = useState([])
  const [search, setsearch] = useState("")

  const fetchPost = async()=>{
    const res = await axios.get("http://localhost:5000/allPost")
    setdata(res.data.data)
    
  }
  

const fetchSerachPost = async()=>{
  const res = await axios.get(`http://localhost:5000/byheading?heading=${search}`)
  console.log(res.data.data);
  setdata(res.data.data)
}

useEffect(() => {
  if (search.length > 0) {
    fetchSerachPost();
  } else {
    fetchPost();
  }
}, [search]);
  



  return (
    <div className="feed-container">
      <Box className="feed-container1" >
        <Box className="feed1">
          <TextField variant="outlined" label="Serach posts here" fullWidth
          sx={{width:"350px"}}  value={search} onChange={(e)=>setsearch(e.target.value)}  />
            <Box>
        <AddModal/>
            </Box>
        </Box>

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
