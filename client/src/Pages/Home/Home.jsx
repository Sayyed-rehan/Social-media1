import React from 'react'
import { Grid }from '@mui/material'
import axios from 'axios'
import About from '../../Components/About/About'
import Feed from '../../Components/Feed/Feed'

const Home = () => {
  return (
    <div>
      <Grid container>
        <Grid xs={3}><About/></Grid>
        <Grid xs={6} sx={{bgcolor:""}}><Feed/></Grid>
        <Grid xs={3}  sx={{bgcolor:"blue"}}>hello</Grid>
      </Grid>
    </div>
  )
}

export default Home