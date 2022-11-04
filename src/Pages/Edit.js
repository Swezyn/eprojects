import React from 'react'
import db, { useAuth } from '../Firebase';
import {useState, useEffect} from 'react';
import { onSnapshot, collection, setDoc, doc, query, orderBy } from 'firebase/firestore';
import './CSS/Edit.css'
import { Button, MenuItem, TextField, Box} from '@mui/material';

import EditStep from '../Components/EditStep';
import CreateStep from '../Components/CreateStep';
import { useNavigate } from 'react-router-dom';

function Edit(props) {

  const currentUser = useAuth()
  let navigate = useNavigate()

  if (!currentUser){
    navigate('/')
  }

  const [project, setProject] = useState()
  const [projects, setProjects] = useState([]);
  const [tutorials, setTutorials] = useState([]);

  const [desc, setDesc] = useState('')
  const [time, setTime] = useState('')
  const [timeUnit, setTimeUnit] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const [createStepOpen, setCreateStep] = useState(false)

  const timeUnits = ["Minutes", "Hours", "Days", "Months"]
  const difficulties = ["Beginner", "Intermediate", "Expert"]

  useEffect(() => {
    onSnapshot(collection(db, `Projects`), (snapshot) =>
        snapshot.docs.map((doc) => 
          (doc.id === props.name ? setProject(doc.data()) : null)
          )
      )
  }, [])
  
  useEffect(
    () => {
      const collectionRef = collection(db, `Projects/${props.name}/Tutorial`);
      const q = query(collectionRef, orderBy("Step"))

      const unsub = onSnapshot(q, (snapshot) =>
      setTutorials(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );

      return unsub;
    },
    []
  );

  useEffect(() => {
    onSnapshot(collection(db, `Projects/${props.name}/Project`), (snapshot) =>
        setProjects(snapshot.docs.map((doc) => 
          ({ ...doc.data(), id: doc.id })
          ))
      )
  }, [])

  useEffect(() => {
    let timer = setTimeout(() => {
        if (desc || time || timeUnit || difficulty){
            editProject()
        }
    }, 3000)

    return () => clearTimeout(timer)
  }, [desc, time, timeUnit, difficulty])

  useEffect(() => {
    let timer = setTimeout(() => {
      if (projects){
        updateVariables()
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [projects])

  const editProject = async () => {
    const docRef = doc(db, `Projects/${props.name}/Project`, "About")
    const payload = {Desc: desc, Time: time, TimeUnit: timeUnit, Difficulty: difficulty}
    await setDoc(docRef, payload)
    console.log("edited project")
}

  function updateVariables(){
    projects.map((projectt) => (
      projectt.id == "About" ? (setTime(projectt.Time), setTimeUnit(projectt.TimeUnit), setDesc(projectt.Desc), setDifficulty(projectt.Difficulty)) : null
    ))
  }

  return (
    <div className='edit_container'>
      <h1 style={{marginTop:"5rem", fontSize:"3.5rem"}}>{project?.Header}</h1>
      {/* Project Inputs */}
        <Box width={"40rem"} margin={"3rem 0"} display={"flex"} flexDirection={"column"} alignItems={'center'}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline 
            value={desc}
            minRows={5}
            placeholder="Enter Description"
            margin='normal'
            fullWidth
            onChange={(e) => setDesc(e.target.value)}
            />
            <Box display={"flex"} width={"40rem"}>
              <TextField
              id="outlined-multiline-static"
              label="Completion Time"
              placeholder="Enter Description"
              value={time}
              fullWidth
              margin='normal'
              type={"number"}
              onChange={(e) => setTime(e.target.value)}
              />
              <Box width={"10rem"}>
                <TextField
                id="outlined-select-currency"
                label="Select"
                select
                fullWidth
                margin='normal'
                value={timeUnit}
                onChange={e => setTimeUnit(e.target.value)}
                >
                  {timeUnits.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
            <Box width={"30rem"}>
              <TextField
                  id="outlined-select-currency"
                  label="Select Difficulty"
                  value={difficulty}
                  select
                  fullWidth
                  margin='normal'
                  onChange={e => setDifficulty(e.target.value)}
                  >
                    {difficulties.map((diffi) => (
                      <MenuItem key={diffi} value={diffi}>
                        {diffi}
                      </MenuItem>
                    ))}
              </TextField>
            </Box>
        </Box>
      {/* Tutorial */}
      <h1 style={{marginTop:"3rem", fontSize:"2.5rem"}}>Tutorial</h1>
      <Box width={"15rem"} margin={"3rem 0"}>
        <Button size='large' variant="contained" fullWidth onClick={() => setCreateStep(!createStepOpen)}>{!createStepOpen ? "Add New Step" : "Cancel New Step"}</Button>
      </Box>
      {createStepOpen && (
        <CreateStep name={props.name} close={setCreateStep} step={tutorials.length + 1}/>
      )}
      {/*stepObjs*/}
      {tutorials.map((tutorial,i) => (
        <EditStep dark={i % 2 == 0 ? true: false} object={tutorial}/>
      ))}
      {currentUser?.uid !== project?.Owner ? 
      <div className='overlay'>
            <h2>Waiting for access...</h2>
        </div> : null}
    </div>
  )
}

export default Edit