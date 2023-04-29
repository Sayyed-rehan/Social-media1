// import React, { useState, useEffect } from "react";
// import { Avatar, Box, Button, Divider, IconButton, Modal, Stack, Typography } from "@mui/material";
// import { currentUser } from "../utils/currentUser";
// import axios from "axios";
// import email from "./../images/email.png"
// import addfriend from "./../images/addfriend.png"


// const ConnetModal = () => {
//   const [isModalOpen, setisModalOpen] = useState(false);
//   const [UsercityData,setUsercityData] = useState([])

//   const fetchDataByCity = async () => {
//     const res = await axios.get(`http://localhost:5000/getUserbyCity?city=${currentUser.city}`);
//     // console.log("from coonect",res.data.data);
//     setUsercityData(res.data.data);
//   };

//   const styles = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
//     width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 4,};


//   useEffect(()=>{fetchDataByCity()},[])

//   return (
//     <>
//       <IconButton onClick={() => setisModalOpen(true)}>
//         <img src={addfriend} width="30" />
//       </IconButton>
//       <Modal open={isModalOpen} onClose={() => setisModalOpen(false)}>
      
//         <Box sx={styles} boxShadow={12}> 
//             <Typography variant='h5' fontWeight='bold' sx={{display:"flex", justifyContent:"center"}}>Connet friends from your City</Typography>
//             <Divider/>
//         {UsercityData && UsercityData.length>0  ? 
//         (UsercityData.filter(a=>a._id!=currentUser._id).map((x,i)=>(

//             <Box sx={{pt:"20px"}} key={x._id}>
//               <Stack direction='row' spacing={2}>
//                 <Box>
//                   <Avatar sx={{ width: 56, height: 56 }}>{x.name.split("",1)}</Avatar>
//                 </Box>
//                 <Box>
//                 <Typography sx={{display:"flex", alignItems:"center", gap:"8px"}}><img src={person} width='20'/>{x.name}</Typography>
//                 <Typography sx={{display:"flex", alignItems:"center", gap:"8px"}}><img src={email} width='20'/>{x.email}</Typography>
//                 <Button variant='contained' sx={{mt:"10px", mb:"10px"}}>Connect</Button>
//                 <Divider/>
//                 </Box>
//               </Stack>
//             </Box>
            
//         )))
//         :<Typography>No data found</Typography>}
//         </Box>
    
//       </Modal>
//     </>
//   );
// };

// export default ConnetModal;
