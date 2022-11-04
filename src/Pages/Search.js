import React, { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar';
import ProjectCard from '../Components/ProjectCard';
import { useSnapshot } from 'valtio';
import { searchInputState } from '../Components/MyNavbar';
import { onSnapshot, collection } from 'firebase/firestore';
import db from '../Firebase';
import { Box } from '@mui/material';

function Search() {

  const snap = useSnapshot(searchInputState)

  console.log(snap.searchInput)

  const [projects, setProjects] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, `Projects`), (snapshot) =>
        setProjects(snapshot.docs.map((doc) => 
        ({ ...doc.data(), id: doc.id })
        ))
      ),
    []
  );

  return (
    <div className='home_container'>
        <Sidebar />
        <Box className='column' marginLeft="15vw">
          {projects.map((project) => (
            project.Header.toLowerCase().includes(snap.searchInput.toLowerCase()) ?
            <ProjectCard project={project} width={"25rem"} height={"13rem"} side={true}/> : null
          ))}
        </Box>
    </div>
  )
}

export default Search