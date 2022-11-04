import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './CSS/Sidebar.css'
import { FaHome, FaUser, FaCompass, FaStar, FaHeart, FaHourglassHalf } from "react-icons/fa"
import { useSnapshot, proxy } from 'valtio'
import { Link } from 'react-router-dom'

const state = proxy({
  sidebarOpen: false,
})

export { state as sidebarState }

function Sidebar() {

  const snap = useSnapshot(state)

  return (
    <Box className={`sidebar-container ${snap.sidebarOpen ? "active" : ""}`} width={snap.sidebarOpen ? "15rem" : "5rem"}>
        <Link to="/"><Button color='info' fullWidth startIcon={<FaHome />}><p>{snap.sidebarOpen?"Home":null}</p></Button></Link>
        <Button color='info' fullWidth startIcon={<FaCompass />}><p>{snap.sidebarOpen?"Explore":null}</p></Button>
        <Button color='info' fullWidth startIcon={<FaUser />}><p>{snap.sidebarOpen?"Following":null}</p></Button>
        <Box height="3rem" />
        <Button color='info' fullWidth startIcon={<FaStar />}><p>{snap.sidebarOpen?"Favourites":null}</p></Button>
        <Button color='info' fullWidth startIcon={<FaHeart />}><p>{snap.sidebarOpen?"Liked projects":null}</p></Button>
        <Button color='info' fullWidth startIcon={<FaHourglassHalf />}><p>{snap.sidebarOpen?"History":null}</p></Button>
    </Box>
  )
}

export default Sidebar