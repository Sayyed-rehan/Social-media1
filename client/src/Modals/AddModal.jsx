import React, { useState } from "react";
import {Box, Button, IconButton, Modal, Stack, TextField, Typography,} from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import { currentUser } from "../utils/currentUser";
import addPosts from "./../images/addPosts.png";

const AddModal = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [UserID, setUserID] = useState("");


  const [form, setform] = useState({
    heading: "",
    desc: "",
    Images: "",
  });

  const handleInput = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const styles = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", 
  boxShadow: 24, p: 4, borderRadius: 4,};

    //to add post
  const handleAdd = async () => {
    const res = await axios.post("http://localhost:5000/createPost", {
      heading: form.heading,
      desc: form.desc,
      img: form.Images,
      postedBy: currentUser._id,
    });
    //get User data by ID
    const responce = await axios.get(
      `http://localhost:5000/getUserByID?_id=${currentUser._id}`
    );
    console.log("id details", responce.data.data.name);
    setUserID(responce.data.data.name);
    setisModalOpen(false);

    await swal({
      title: "Post Added",
      text: "You are ready to GO",
      icon: "success",
    });
    setform({ heading: "", desc: "", Images: "" });
    console.log(res.data.data);
    location.reload();
  };

  return (
    <>
      <IconButton size="large" edge="start" onClick={() => setisModalOpen(true)}>
        <img src={addPosts} width="32" />
      </IconButton>

      <Modal open={isModalOpen} onClose={() => setisModalOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={styles} boxShadow={12}>
          <Typography
            variant="h4"
            sx={{ display: "flex", justifyContent: "center" }}>
            Add post
          </Typography>
          <Stack spacing={4} sx={{ pt: 2, pb: 2 }}>
            <TextField variant="outlined" label="heading" name="heading" value={form.heading} onChange={handleInput}/>
            <TextField variant="outlined" label="desc" name="desc" value={form.desc} onChange={handleInput} multiline/>
            <TextField variant="outlined" label="Images Url" name="Images" value={form.Images} onChange={handleInput} multiline/>
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleAdd} variant="contained">
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddModal;
