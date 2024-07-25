import React,{useContext, useState} from 'react'
import Notes from './Notes'
import './Login.css';

export const Home = (props) => {
  
  const {showalert}=props;
  const username = localStorage.getItem('name');

  return (
    <div>
      <div className="welcome-container">
        <h2>Welcome, {username}</h2>
      </div>
      <Notes showalert={showalert}/>
    </div>
  )
}

export default Home



