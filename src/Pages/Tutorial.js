import React from 'react'
import Step from "../Components/Step";
import './CSS/Tutorial.css'
import db from '../Firebase';
import {useState, useEffect} from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import CompletedTutorial from '../Components/CompletedTutorial';
import Modal from '../Components/Modal';

function Tutorial(props) {
  const [steps, setStep] = useState([]);
  const [index, setIndex] = useState(0)

  const [openModal, setOpenModal] = useState(false)
  const [modalHeader, setModalHeader] = useState('')
  const [modalDesc, setModalDesc] = useState('')
  
  useEffect(
    () =>
      onSnapshot(collection(db, `Projects/${props.project.id}/Tutorial`), (snapshot) =>
        setStep(snapshot.docs.map((doc) => 
        ({ ...doc.data(), id: doc.id })
        ))
      ),
    []
  );

  function buttonPressed(button){
    if (button === "Right" && index === steps.length - 1){
      setOpenModal(true)
      setModalHeader("You have completed the tutorial!")
      setModalDesc("Are you sure you want to exit the tutorial?")
    }
    else if (button === 'Right' && index < steps.length - 1){
      var updatedIndex = index + 1
      setIndex(updatedIndex)
    }
    else if (button === 'Left' && index > 0){
      var updatedIndex = index - 1
      setIndex(updatedIndex)
    }
  }

  return (
    <div className='tutorial_container'>
      {index < steps.length ?
      <div className='center'>
          {index > 0 ?
          <Box top="45vh" left="10vw" position="absolute">
            <Tooltip title="Previous Step" placement='top'>
              <IconButton style={{backgroundColor: "var(--bg-accent)", height:"7rem", width:"7rem"}} size='large' onClick={() => buttonPressed('Left')}>
                <FaArrowLeft/>
              </IconButton>
            </Tooltip>
          </Box>
          : null}
          <Box top="45vh" right="10vw" position="absolute">
            <Tooltip title={index < steps.length - 1 ? "Next Step" : "Finish Tutorial"} placement='top'>
              <IconButton style={index === steps.length - 1 ? {backgroundColor: "var(--accent)", height:"7rem", width:"7rem"} : {backgroundColor: "var(--bg-accent)", height:"7rem", width:"7rem"}} size='large' onClick={() => buttonPressed('Right')}>
                <FaArrowRight/>
              </IconButton>
            </Tooltip>
          </Box>
        <div className='steps'>
        {steps.map((step, i) => (
          i == index ? <Step step={step} i={i}/> : null
        ))}
        <Modal Open={openModal} Header={modalHeader} Desc={modalDesc} Event={() => setIndex(steps.length)} setOpen={setOpenModal}/>
        </div>
      </div>
      : <div className='center'>
          <CompletedTutorial project={props.project} />
        </div>} 
    </div>
  )
}

export default Tutorial