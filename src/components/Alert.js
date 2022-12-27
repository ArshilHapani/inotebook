import React from 'react'

export default function Alert(props) {
  return (
    props.alert && <div className={`custom-alert ${props.alert.type}`}>      
      <p>{props.alert.message}</p>
    </div>
  )
}
