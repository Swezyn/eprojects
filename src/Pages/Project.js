import React from 'react'
import db from '../Firebase';
import {useState, useEffect} from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import './CSS/Project.css'
import { Link } from 'react-router-dom'
import { Button, Box } from '@mui/material';

function Project(props) {

    const [projects, setProjects] = useState([]);
  
  useEffect(
    () =>
      onSnapshot(collection(db, `Projects/${props.name}/Project`), (snapshot) =>
      setProjects(snapshot.docs.map((doc) => 
        ({ ...doc.data(), id: doc.id })
        ))
      ),
    []
  );

  return (
    <div className='project_container'>
        {projects.map((project, i) => (
        project.id == "About" ? 
        <div>
            <div className='about'>
                <img src={props.image} alt=''/>
                <div className='right'>
                    <h1>{props.header}</h1>
                    <Box width={"15rem"}>
                      <Link to={`/tutorial/${props.name}`}><Button size='large' variant="contained" fullWidth>Start Tutorial</Button></Link>
                    </Box>
                    <div className='text'>
                        <p>{project.Desc}</p>
                    </div>
                </div>
            </div>
            <div className='info'>
                <h3>Info</h3>
                <p>Time: {project.Time} {project.TimeUnit}</p>
                <p>Difficulty: {project.Difficulty}</p>
            </div>
        </div> 
        : project.id == "Resources" ? 
        <div>
            <div className='resources'>
                <h3>Resources</h3>
                {Object.keys(project).map((key, i) => (
                    key != 'id' ?
                    <p>{key}: {Object.values(project)[i]}x</p>
                    : null
                ))}
            </div>
        </div> 
        : null
        
      ))}
    </div>
  )
}

export default Project