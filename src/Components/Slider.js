import { Box, IconButton } from '@mui/material'
import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

function Slider(props) {
  return (
    <div>
        <Box position="absolute" width="92vw" height={props.height} display="flex" justifyContent="space-between" alignItems="center">
            <IconButton size='large'>
                <FaArrowLeft />
            </IconButton>
            <IconButton size='large'>
                <FaArrowRight />
            </IconButton>
        </Box>
        <Box padding="0 5rem">
            {props.children}
        </Box>
    </div>
  )
}

export default Slider