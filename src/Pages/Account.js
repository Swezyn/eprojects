import { Box, Button, IconButton, Input, styled, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAuth, updatePhoto, updateUsername } from '../Firebase';
import { FaUserCircle } from "react-icons/fa";

function Account() {
  const currentUser = useAuth();
  const [photoURL, setPhotoURL] = useState('http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png')
  const [username, setName] = useState(null)

  useEffect(() => {
    if (currentUser?.photoURL){
      setPhotoURL(currentUser.photoURL)
    }
    if (!username){
      setName(currentUser?.displayName)
    }
  }, [currentUser])
  
  if(!currentUser) return

  const Input = styled('input')({
    display: 'none',
  });

  function updateName(){
    updateUsername(currentUser, username)
  }

  return (
    <div className='column'>
      <Box height="10rem" />
      <div className='center'>
        <label htmlFor="icon-button-file">
          <Box display="flex" flexDirection="column" alignItems="center" width="8rem">
            <Input accept="image/*" id="icon-button-file" type="file" onChange={(e) => updatePhoto(currentUser, e.target.files[0])}/>
            <IconButton component="span" style={{height:"8rem", width:"8rem", overflow:"hidden", backgroundColor: "var(--bg-alt)"}}>
              <img src={photoURL} style={{height:"115%", width:"115%", objectFit:"cover"}}/>
            </IconButton>
          </Box>
        </label>
        <Box width="3rem"/>
        <div className='column'>
          <h2>{currentUser.displayName}</h2>
          <p>{currentUser.email}</p>
        </div>
      </div>
      <Box width="25rem">
        <Box height="3rem" />
        <Box className='center'>
          <TextField label="Name" fullWidth value={username} onChange={(e) => setName(e.target.value)}></TextField>
          {username !== currentUser.displayName ?
          <Box position="absolute" marginLeft="15rem">
            <Button size='large' variant='outlined' onClick={updateName} fullWidth>Update</Button>
          </Box> : null
          }
        </Box>
        <TextField label="Email" defaultValue={currentUser.email} fullWidth margin='normal' inputProps={{ readOnly: true, }}/>
      </Box>
    </div>
  )
}

export default Account