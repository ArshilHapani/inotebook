import React from 'react'

export default function Alert(props) {
  return (
    <div className={`custom-alert ${props.type}`}>      
      <p>{props.message}</p>
    </div>
  )
}
