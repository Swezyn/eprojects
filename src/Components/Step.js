import React from 'react'
import './CSS/Step.css';

function Step(props) {
  return (
    <div className='step_container'>
        <h2>Step {props.i + 1}</h2>
        <h1>{props.step.Header}</h1>
        <div className='image'>
          <img src={props.step.Image} alt="" />
        </div>
        <p>{props.step.Desc}</p>
    </div>
  )
}

export default Step
