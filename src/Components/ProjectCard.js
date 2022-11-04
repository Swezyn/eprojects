import React, { useEffect, useState } from 'react'
import './CSS/ProjectCard.css'
import { Link } from 'react-router-dom'
import { Box, Button, Rating } from '@mui/material'

function ProjectCard(props) {

  const [time, setTime] = useState('')

  useEffect(() => {
    setRightTime()

  }, [props.project.Date])
  

  function setRightTime(){
    
  if (props.project.Date !== undefined) {
    const created = new Date(JSON.parse(props.project.Date))
    const today = new Date()
    
    const diff = today.getTime() - created.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if (years > 0) {
      setTime(`${years} year${years > 1 ? "s" : ""} ago`)
      } 
      else if (months > 0) {
        setTime(`${months} month${months > 1 ? "s" : ""} ago`)
      }
      else if (days > 0) {
        setTime(`${days} day${days > 1 ? "s" : ""} ago`)
      }
      else if (hours > 0) {
        setTime(`${hours} hour${hours > 1 ? "s" : ""} ago`)
      }
      else{
        setTime(`${minutes} minute${minutes > 1 ? "s" : ""} ago`)
      }
    }
  }

  return (
    <Box className='card' width={props.width}>
      <div className={props.side ? "center" : ""}>
        <Link to={`/project/${props.project.id}`}>
          <Box className='card-image' width={props.width} height={props.height}>
            <img src={props.project.Image} alt=''></img>
          </Box>
        </Link>
        <Box className={`box ${props.side ? "side" : ""}`}>
          <Box>
            <h2>{props.project.Header}</h2>
            <Box display={props.side ? "flex" : "block"}>
              <Rating defaultValue={props.project.Rating} precision={0.5} readOnly size='small' />
              <p>{time}</p>
            </Box>
          </Box>
          {props.side && <Box height="2rem" />}
          <Box width="10rem">
            <Link to={`/project/${props.project.id}`}><Button size='medium' variant='outlined' fullWidth >Learn more</Button></Link>
          </Box>
        </Box>
        </div>
    </Box>
  )
}

export default ProjectCard