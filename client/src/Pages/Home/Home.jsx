import React from 'react'
import { Grid }from '@mui/material'
import axios from 'axios'
import About from '../../Components/About/About'
import Feed from '../../Components/Feed/Feed'
import Contact from '../../Components/Contact/Contact'

const Home = () => {
  return (
    <div>
      <Grid container>
        <Grid xs={3} item><About/></Grid>
        <Grid xs={6} item ><Feed/></Grid>
        <Grid xs={3} item ><Contact/></Grid>
      </Grid>
    </div>
  )
}

export default Home