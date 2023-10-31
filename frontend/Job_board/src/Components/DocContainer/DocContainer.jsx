import React from 'react'
import './docContainer.css'

const DocContainer = (props) => {
  return (
  <div className='docContainer'>
    {Object.keys(props.element).map(key =>{
        return <div className='doc_field'>
        <div className='doc_field_label'>{key}</div>
        <div>{props.element[key]}</div>
        </div>
    })}
  </div>
  )
}

export default DocContainer