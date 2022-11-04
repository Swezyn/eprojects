import { setDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import db from "../Firebase"
import '../Pages/CSS/Create.css'
import {FaCamera} from 'react-icons/fa'
import { Button, TextField, Box, styled} from '@mui/material';

import { v4 as uuidv4 } from 'uuid';

const Input = styled('input')({
    display: 'none',
  });
  

function CreateStep(props) {

    const [header, setHeader] = useState("")
    const [desc, setDesc] = useState("")
    const [image, setImage] = useState("")

    const addStep = async () => {
        if (!header || header.length === 0) return;
        if (!desc || desc.length === 0) return;
        if (!image || image.length === 0) return;
        const docRef = doc(db, `Projects/${props.name}/Tutorial`, uuidv4())
        const payload = {Header: header, Desc: desc, Image: image, Step: props.step}
        await setDoc(docRef, payload)
        props.close(false);
    }

    function imageToUrl(file){
      const reader = new FileReader();
      reader.onloadend = () => {
          setImage(reader.result);
      };
      reader.readAsDataURL(file);
  }
    
  return (
    <div className='create-container' style={{paddingTop: "2vh"}}>
        <div className='banner'><img src={image} alt='' /></div>
        <Box width={"40rem"} marginTop={"5vh"} display={"flex"} flexDirection={"column"} alignItems={"center"}> 
            <Box width={"100%"} marginBottom={"3vh"}>
                <TextField
                id="outlined-multiline-static"
                label="Header"
                multiline 
                placeholder="Enter Header"
                fullWidth
                onChange={e => setHeader(e.target.value)}
                />
            </Box>
            <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline 
            placeholder="Enter Description"
            minRows={3}
            fullWidth
            onChange={e => setDesc(e.target.value)}
            />
            <label htmlFor="contained-button-file">
                <Input onChange={(e) => imageToUrl(e.target.files[0])} accept="image/*" id="contained-button-file" multiple type="file" />
                <Box width={"15rem"} margin={"2rem 0"}>
                    <Button variant="outlined" startIcon={<FaCamera />} component="span" size='large' fullWidth>Upload</Button>
                </Box>
            </label>
            <Box width={"25rem"} margin={"10vh 0"}>
                <Button size='large' variant="contained" fullWidth onClick={addStep}>Add Step</Button>
            </Box>
        </Box>
    </div>
  )
}

export default CreateStep