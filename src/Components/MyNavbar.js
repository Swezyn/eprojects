import './CSS/Navbar.css';
import { FaPlus, FaUserCircle, FaSearch, FaBars } from "react-icons/fa";
import { useAuth, logout } from '../Firebase';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, IconButton, TextField } from '@mui/material';
import { sidebarState } from './Sidebar';
import { proxy, useSnapshot } from 'valtio';

const state = proxy({
  searchInput: '',
})

export { state as searchInputState }

export default function MyNavbar() {
  const snap = useSnapshot(sidebarState)

  const currentUser = useAuth()
  let navigate = useNavigate()

  const [activeDropdown, setActiveDropdown] = useState('')
  const [input, setInput] = useState('')

  useEffect(() => {
    window.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        SubmitInput()
      }
    });
  }, []);

  function SubmitInput() {
    state.searchInput = input 
    navigate('/search')	// Navigate to the search page
  }

  return (
    <nav className="navbar">
        <div className='left'>
          <IconButton onClick={() => sidebarState.sidebarOpen = !snap.sidebarOpen} size='small'>
            <FaBars />
          </IconButton>
          <Link to="/">
            <div className='navbar-logo'>
              <img src='../logo.png' />
            </div>
          </Link>
        </div>
        <div>
          <Box width="30vw" height="100%" display="flex" alignItems="center" justifyContent="flex-end">
              <TextField
                id="outlined-static"
                label="Search"
                placeholder=""
                fullWidth
                size='small'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
                <IconButton onClick={() => SubmitInput()} style={{position: "absolute", height: "2.5rem", width: "2.5rem"}}><FaSearch size={15} /></IconButton>
            </Box>
        </div>
        <ul className="navbar-nav">
        {currentUser ?
        <div>
          <Link to="/create"><IconButton variant='outlined' style={{backgroundColor: "var(--bg-alt)", marginRight: "1rem"}}><FaPlus /></IconButton></Link>
          <IconButton onClick={() => activeDropdown !== 'user' ? setActiveDropdown('user') : setActiveDropdown('')} style={{backgroundColor: "var(--bg-alt)", marginRight: "1rem", overflow:"hidden", width:"2.5rem", height:"2.5rem"}}><img style={{height:"175%", width:"175%", objectFit:"cover"}} src={currentUser?.photoURL ? currentUser?.photoURL : "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"} /></IconButton>
          {activeDropdown == 'user' ? <div className='dropdown'>
            <Link to="/account"><Button color='info' size='large' onClick={() => setActiveDropdown('')} fullWidth>Account</Button></Link>
            <Button color='info' size='large' onClick={() => {
              logout()
              setActiveDropdown('')
              }}>Sign out</Button>
          </div> : null}
        </div>
        : 
        <div>
          <Link to="/login"><Button color='info' variant='outlined' startIcon={<FaUserCircle/>}>Login</Button></Link>
        </div>
        }
          </ul>
      </nav>
  );
}