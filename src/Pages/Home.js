import React, {useState, useEffect} from 'react'
import ProjectCard from '../Components/ProjectCard';
import './CSS/Home.css'
import db from '../Firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import { TextField, Box, Button } from '@mui/material';
import Sidebar from '../Components/Sidebar';

function Home() {

  const [projects, setProjects] = useState([]);

  const [category, setCategory] = useState('');

  useEffect(
    () =>
      onSnapshot(collection(db, `Projects`), (snapshot) =>
        setProjects(snapshot.docs.map((doc) => 
        ({ ...doc.data(), id: doc.id })
        ))
      ),
    []
  );

  console.log(projects)

  return (
    <div className='home_container'>
        <Sidebar />
        <div className="projects">
          <div className='center'>
            <div className='categories'>
              <Button onClick={() => setCategory("")} color='secondary' size='large' variant='contained' fullWidth>All</Button>
              <Button onClick={() => setCategory("Electronics")} color='secondary' size='large' variant='contained' fullWidth>Electronics</Button>
              <Button onClick={() => setCategory("Programming")} color='secondary' size='large' variant='contained' fullWidth>Programming</Button>
              <Button onClick={() => setCategory("Outdoor")} color='secondary' size='large' variant='contained' fullWidth>Outdoor</Button>
              <Button onClick={() => setCategory("Other")} color='secondary' size='large' variant='contained' fullWidth>Other</Button>
            </div>
          </div>
          <div className='project-list'>
          <h2>Recommended</h2>
            <div className='project-holder'>
            {projects.map((project) => (
              (project.Category === category || category === '') &&
              <ProjectCard project={project} width={"25rem"} height={"13rem"} side={false}/>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home