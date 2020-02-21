import React, {useState} from "react"
import { Link } from 'react-router-dom'

import axios from 'axios'

const Register = (props) =>
{
    const [creds, setCreds] = useState({username: '', password: ''})

    const handleSubmit = event =>
    {
        event.preventDefault()
        axios.post('http://localhost:3300/api/auth/register', creds)
            .then(res =>
                {
                    props.history.push('/')
                })
            .catch(err =>
                {
                    console.log(err)
                })
    }

    const handleChange = event =>
    {
        setCreds({...creds, [event.target.name]: event.target.value})
    }

    return (
        <>
            <Link to='/'>Login Page</Link>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={creds.username} onChange={handleChange}/>
                <input type="password" name="password" value={creds.password} onChange={handleChange}/>
                <button type="submit">Submit Registration!</button>
            </form>
        </>
    )
}

export default Register