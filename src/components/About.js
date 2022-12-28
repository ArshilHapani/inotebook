import React from 'react'

export default function About() {
  return (
    <div>
      <div className='profile-wrapper'>
        <div className="profile-container">
          <div className="userdata">
            <h1>About us.</h1><hr />
            <ul>
              <li className='about-li'>This is the iNotebook app which is used to store all your task lists in the cloud</li>
              <li className='about-li'>all your data is secret and authenticated in the verified authoity</li>
              <li className='about-li'>This application is generated using MERN stack <b><a href="https://www.geeksforgeeks.org/mern-stack/" target="_blank" rel='noreferrer'> Learn more about MERN stack</a></b></li>
              <li className='about-li'>Developed by Arshil Hapani under the guidance of Code With Harry.</li>
              <li className='about-li'>No Bootstraped is used..</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
