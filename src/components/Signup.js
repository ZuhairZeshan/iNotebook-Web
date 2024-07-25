import React,{useState} from 'react'
import { useNavigate  } from "react-router-dom";

const Signup = (props) => {
  const [credentials,setcredentials]=useState({name:"",email:"",password:"",cpassword:""});
  let history=useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();  //to prevent page from reloading
    let {name,email,password,cpassword}=credentials;
    if (password !== cpassword) {
      props.showalert("Passwords do not match", "Danger");
      return;
    }
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password})
    });
    const json= await response.json();
    console.log(json.success , json.authtoken);
    if(json.success){
      localStorage.setItem('token', json.authtoken);
      localStorage.setItem('name', json.name);
      history("/");
      props.showalert("Account Created Successfully","Success");
    }else{
      props.showalert("Invalid Details","Danger");
    }
    
}

const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value }) //this will keep track on you and store data when writing.
}

let looks={
  color:'white',
}

  return (
    <div className='container mt-3' style={looks}>
    <h2>Create an Account to Use iNotebook</h2>
      <div>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" className="form-control" name='name' onChange={onchange} id="name" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' onChange={onchange} id="email" aria-describedby="emailHelp" />
            <div id="emailHelp" style={looks} className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' onChange={onchange} id="password" minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name='cpassword' onChange={onchange} id="cpassword" minLength={5} required/>
          </div>
          <button  type="submit" className="btn btn-primary" >Sign UP</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
