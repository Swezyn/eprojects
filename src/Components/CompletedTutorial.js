import React, { useEffect, useState } from 'react'
import { Box, Button, Rating } from '@mui/material'
import db from "../Firebase"
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

function CompletedTutorial(props) {

    const [rating, setRating] = useState(0)
    const [project, setProject] = useState(null)

    useEffect(() => {
        onSnapshot(collection(db, `Projects`), (snapshot) =>
            snapshot.docs.map((doc) => 
              (doc.id === props.project.id ? setProject(doc.data()) : null)
              )
          )
      }, [])

    useEffect(() => {
        updateRating()
    }, [rating])
    
    const updateRating = async () => {
        const docRef = doc(db, "Projects", props.project.id)

        if (!project) return;

        const finalRating = (parseFloat(project.Rating) * parseInt(project.Ratings) + rating) / (parseInt(project.Ratings) + 1)
        console.log(project?.Rating, project?.Ratings, rating, finalRating)
        const ratings = (parseInt(project?.Ratings) ?? 0) + 1

        const res = await setDoc(docRef, { Rating: finalRating, Ratings: ratings }, {merge: true})
    }

  return (
    <Box className='column' height="calc(100vh - var(--nav-size))">
        <h2 style={{fontSize: "1.5rem"}}>You have completed the tutorial!</h2>
        <h1 style={{fontSize: "4rem"}}>{project?.Header}</h1>
        <Box height="5rem" />
        {rating !== -5 ? <div className='column'>
            <p style={{fontSize: "1.5rem"}}>Please rate the project</p>
            <Rating defaultValue={project?.Rating} value={rating} onChange={(e) => setRating(e.target.value)} precision={0.5} size='large' />
        </div>
        : <div>
            <p>Your feedback is appreciated!</p>
        </div>}
        <Box height="5rem" />
        <Box width="15rem">
            <Link to="/"><Button variant='contained' fullWidth>Return to home</Button></Link>
        </Box>
    </Box>
  )
}

export default CompletedTutorial