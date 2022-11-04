import React from 'react'
import './index.css'

function Background(props) {
  return (
    <div className="background">
      {props.children}
    </div>
  )
}

export default Background