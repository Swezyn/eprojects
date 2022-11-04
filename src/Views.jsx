import React from 'react'
import Animation from './Components/Animation';
import { Routes, Route, useLocation } from 'react-router-dom'
import db from './Firebase';
import {useState, useEffect} from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion'

import Tutorial from "./Pages/Tutorial";
import Home from "./Pages/Home";
import Project from "./Pages/Project";
import Create from './Pages/Create';
import Edit from './Pages/Edit';
import Login from './Pages/Login';
import Account from './Pages/Account';
import Search from './Pages/Search';

function Views() {

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

  const location = useLocation();

  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Animation><Home /></Animation>} />
      <Route path='/login' element={<Animation><Login /></Animation>} />
      <Route path='/account' element={<Animation><Account /></Animation>} />
      <Route path='/create' element={<Animation><Create /></Animation>}/>
      <Route path='/search' element={<Animation><Search /></Animation>}/>
      <Route path="/project">
          {projects.map((project) => (
            <Route path={project.id} element={<Animation><Project name={project.id} header={project.Header} image={project.Image}/></Animation>}/>
          ))}
      </Route>
      <Route path="/tutorial">
          {projects.map((project) => (
            <Route path={project.id} element={<Animation><Tutorial project={project}/></Animation>}/>
          ))}
      </Route>
      <Route path="/edit" >
          {projects.map((project) => (
            <Route path={project.id} element={<Animation><Edit name={project.id}/></Animation>}/>
          ))}
      </Route>
      <Route path='*' element={<Home />} />
    </Routes>
    </AnimatePresence>
  )
}

export default Views 