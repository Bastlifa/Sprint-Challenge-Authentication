import React, {useState} from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = (props) =>
{
    const [creds, setCreds] = useState({username: '', password: ''})

    const handleSubmit = event =>
    {
        event.preventDefault()
        axios.post('http://localhost:3300/api/auth/login', creds)
            .then(res =>
                {
                    console.log(res)
                    localStorage.setItem('authorization', res.data.token)
                    props.history.push('/home')
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
            <Link to='/register'>Register Page</Link>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={creds.username} onChange={handleChange}/>
                <input type="password" name="password" value={creds.password} onChange={handleChange}/>
                <button type="submit">Submit!</button>
            </form>
        </>
    )
}

export default Login