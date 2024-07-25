import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Login.css';



const Login = (props) => {

    const [credentials, setcredentials] = useState({ email: "", password: "" });
    let history = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();  //to prevent page from reloading
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('name', json.name);
            props.showalert("Logged in Successfully", "Success");
            history("/");
        } else {
            props.showalert("Invalid Credentials", "Danger");
        }
    }

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value }) //this will keep track on you and store data when writing.
    }

    let looks={
        color:'white',
    }

    return (  //onsubmit should be on form and onclick is on button
        <div className='login-container'>
            <div>
                <h2 className='mb-3'>Login To Continue iNotebook</h2>
                <form onSubmit={handlesubmit} >
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={onchange} value={credentials.email} name="email" id="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text" style={looks}>We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onchange} value={credentials.password} name="password" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login
