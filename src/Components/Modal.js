import React, { useState } from 'react'
import { Button, Box } from '@mui/material';
import './CSS/Modal.css'

function Modal(props) {

  if (!props.Open) return null;

  function confirm(){
    props.Event()
    props.setOpen(false)
  }

  return (
    <div onClick={() => props.setOpen(false)} className='overlay'>
        <div onClick={(e) => {
          e.stopPropagation()
        }} className='modal-container'>
          <h1>{props.Header}</h1>
          <p>{props.Desc}</p>
          <Box width={"20rem"} display={"flex"}>
            <Button size='large' variant='contained' fullWidth onClick={confirm}>YES</Button>
            <Box width={"5rem"}></Box>
            <Button size='large' variant='outlined' fullWidth onClick={() => props.setOpen(false)}>NO</Button>
          </Box>
        </div>
    </div>
  )
}

export default Modal