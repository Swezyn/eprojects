import React, {useState, useEffect} from 'react'
import { Button, TextField, Box, styled } from '@mui/material';
import { FaTrash, FaCamera } from "react-icons/fa";
import './CSS/EditStep.css'
import { setDoc, doc, deleteDoc } from 'firebase/firestore';
import db from '../Firebase';
import Modal from './Modal';

function EditStep(props) {

    const [header, setHeader] = useState(props.object.Header)
    const [desc, setDesc] = useState(props.object.Desc)
    const [image, setImage] = useState(props.object.Image)

    const [openModal, setOpenModal] = useState(false)
    const [modalHeader, setModalHeader] = useState('')
    const [modalDesc, setModalDesc] = useState('')

    const Input = styled('input')({
        display: 'none',
      });

    useEffect(() => {
        let timer = setTimeout(() => {
            if (header || desc || image){
                editStep()
            }
        }, 3000)

        return () => clearTimeout(timer)
      }, [header, desc, image])

    function imageToUrl(file){
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const editStep = async () => {
        const docRef = doc(db, `Projects/${props.name}/Tutorial`, props.object.id)
        const payload = {Header: header ? header : "", Desc: desc ? desc : "", Image: image ? image : ""}
        await setDoc(docRef, payload)
    }

    const deleteStep = async () => {
        const docRef = doc(db, `Projects/${props.name}/Tutorial`, props.object.id)
        await deleteDoc(docRef)
        console.log("deleted")
    }

  return (
    <div className={`editstep-container ${props.dark % 2 === 0 ? 'dark' : null}`}>
        <div className='inner'>
            <div className='image'>
                <img src={image} alt='' />
            </div>
            <Box width={"25rem"}>
                <div className='step'>
                    <h1>Step {props.object.Step}</h1>
                </div>
                <Box margin={"1rem 0"}>
                    <TextField
                    id="outlined-multiline-static"
                    label="Header"
                    value={header}
                    placeholder="Enter Header"
                    fullWidth
                    size='small'
                    onChange={(e) => setHeader(e.target.value)}
                    />
                </Box>
                <Box>
                    <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline 
                    value={desc}
                    minRows={5}
                    placeholder="Enter Description"
                    fullWidth
                    size='small'
                    onChange={(e) => setDesc(e.target.value)}
                    />
                </Box>
                <Box width={"25rem"} display={"flex"} justifyContent={"space-between"} marginTop={"1rem"}>
                    <label htmlFor="contained-button-file">
                    <Input onChange={(e) => imageToUrl(e.target.files[0])} accept="image/*" id="contained-button-file" multiple type="file" />
                        <Box width={"15rem"}>
                            <Button variant="outlined" startIcon={<FaCamera />} component="span" size='large' fullWidth>Upload</Button>
                        </Box>
                     </label>
                    <Button size='large' variant="contained" onClick={() => {
                        setOpenModal(true)
                        setModalHeader("Are you sure?")
                        setModalDesc("This will permanently delete this step")
                    }}><FaTrash /></Button>
                </Box>
            </Box>
        </div>
        <Modal Open={openModal} Header={modalHeader} Desc={modalDesc} Event={deleteStep} setOpen={setOpenModal}/>
    </div>
  )
}

export default EditStep