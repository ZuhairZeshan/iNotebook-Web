import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { useEffect } from 'react';


const About = () => {
  const a = useContext(NoteContext);

  let looks2 = {
    color: 'white',
    backgroundColor: '#042743',
    border: '2px solid white'
  }

  const [activeItem, setActiveItem] = useState(null);

  const handleToggle = (item) => {
    setActiveItem(activeItem === item ? null : item);
  };

  const baseButtonStyle = {
    color: '#000',
    backgroundColor: '#fff',
  };

  const activeButtonStyle = {
    color: 'white',
    backgroundColor: '#042743',
  };


  const accordionBodyStyle = {
    color: 'white',
    backgroundColor: '#042743',
    border: '2px solid white',
  };

  return (
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <h1 style={{ color: 'white' }}>About Us</h1>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button style={activeItem === 1 ? activeButtonStyle : baseButtonStyle}
            onClick={() => handleToggle(1)} class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            About Myself
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body" style={looks2}>
            <strong>My name is Zuhair Zeshan</strong> I am a dedicated web developer with expertise in both <code>Front-End</code> and <code>Back-End</code> development. I am a master of the <code>MERN</code> stack, which includes MongoDB, Express.js, React, and Node.js. I pride myself on being hardworking, consistent, and a fast learner, capable of adapting quickly to fast-paced environments. My commitment to delivering high-quality work drives me to continually improve and stay updated with the latest industry trends.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingTwo">
          <button style={activeItem === 2 ? activeButtonStyle : baseButtonStyle}
            onClick={() => handleToggle(2)} class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            What is iNotebook?
          </button>
        </h2>
        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body" style={looks2}>
            <strong>My first MERN website</strong> is a blog or notes platform where users can easily <code>write, add, delete, and edit notes</code>. It features robust authentication with signup and login functionalities, ensuring secure access for users. Each user has their own separate database, providing personalized and secure data management. This project showcases my ability to build full-stack applications with a focus on user experience and data security.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingThree">
          <button style={activeItem === 3 ? activeButtonStyle : baseButtonStyle}
            onClick={() => handleToggle(3)} class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            My Personal Links
          </button>
        </h2>
        <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body" style={looks2}>
            <a href="https://www.linkedin.com/in/zuhair-zeshan-808119222/" target="_blank"><strong>Visit my LinkedIn profile Zuhair Zeshan</strong></a> <br />
            <a href="https://github.com/ZuhairZeshan?tab=repositories" target="_blank"> <strong>Visit my Github profile ZuhairZeshan</strong></a> <br />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

