import React, {useState} from 'react'
// import React from 'react'
// import {Link} from 'react-router-dom'
import axios from 'axios'
// import Menu from './phna/login.png'


function Login() {
    const [user, setUser] = useState({
        username:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
           const res = await axios.post('http://localhost:3001/public/api/v1/login', {...user})

           if (res.data.access_token !== undefined) {
                localStorage.setItem('firstLogin', true)
                localStorage.setItem('token', res.data.access_token)
           }
            // console.log(res)
            // console.log(res.data)
            // localStorage.setItem('firstLogin', false)
            
            window.location.href = "/";

            
        } catch (err) {
            alert(err.response.data.msg)
        }

    }

    return (
        
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input id="username" type="username" name="username" required
                placeholder="username" value={user.username} onChange={onChangeInput} />

                <input id="password" type="password" name="password" required autoComplete="on"
                placeholder="password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Login</button>
                    
                </div>
            </form>
        </div>
    )
   
}

export default Login
