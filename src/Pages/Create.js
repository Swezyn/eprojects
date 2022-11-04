import { setDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import db, { useAuth } from "../Firebase"
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, styled, MenuItem } from '@mui/material';
import { FaCamera } from "react-icons/fa";

import './CSS/Create.css'

const Input = styled('input')({
  display: 'none',
});

function Create() {

  const currentUser = useAuth()
  let navigate = useNavigate();

  if (!currentUser){

    navigate("/");
  }

  const [projectName, setProjectName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [category, setCategory] = useState('')

  const categories = ["Electronics", "Programming", "Outdoor", "Other"]

  const createProject = async () => {
      if (!projectName || projectName.length === 0) return;
      if (!imageUrl || imageUrl.length === 0) return;
      const docRef = doc(db, "Projects", projectName.replace(/\s/g, ''))
      const payload = {Header: projectName, Image: imageUrl, Owner: currentUser.uid, Date: JSON.stringify(new Date()), Rating: 0, RatingCount: 0, Category: category}
      await setDoc(docRef, payload)
      navigate(`/edit/${projectName.replace(/\s/g, '')}`)
  }

  function imageToUrl(file){
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }
    
  return (
    <div className='create-container'>
        <div className='banner'><img src={imageUrl} alt='' /></div>
        <Box width={"40rem"} marginTop={"3rem"}>
          <TextField
            label="Project Name"
            placeholder="Enter Project Name"
            fullWidth
            onChange={e => setProjectName(e.target.value)}
            />
        </Box>
        <Box width="25rem">
          <TextField
                    id="outlined-select-currency"
                    label="Select Category"
                    value={category}
                    select
                    fullWidth
                    margin='normal'
                    onChange={e => setCategory(e.target.value)}
                    >
                      {categories.map((categor) => (
                        <MenuItem key={categor} value={categor}>
                          {categor}
                        </MenuItem>
                      ))}
                </TextField>
        </Box>
        <label htmlFor="contained-button-file">
          <Input onChange={(e) => imageToUrl(e.target.files[0])} accept="image/*" id="contained-button-file" multiple type="file" />
          <Box width={"15rem"} margin={"2rem 0"}>
            <Button variant="outlined" startIcon={<FaCamera />} component="span" size='large' fullWidth>Upload</Button>
          </Box>
        </label>
        <Box width={"25rem"} margin={"3rem 0"}>
          <Button size='large' variant="contained" fullWidth onClick={createProject}>Create Project</Button>
        </Box>
    </div>
  )
}

export default Create