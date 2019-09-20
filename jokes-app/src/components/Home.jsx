import React, {useEffect, useState} from "react"
import axios from 'axios'

const Home = (props) =>
{
    const [jokes, setJokes] = useState([])

    const axiosWithAuth = () =>
    {
        const token = localStorage.getItem('authorization')
        return axios.create({
            headers:
            {
                'Content-Type': 'application/json',
                'authorization': token
            }
        })
    }

    useEffect(_ =>
        {
            axiosWithAuth().get('http://localhost:3300/api/jokes')
            .then(res =>
                {   
                    console.log(res)
                    setJokes(res.data)
                })
            .catch(err =>
                {
                    console.log('a', err)
                })
        }, [])
    return (
        <>
        {jokes.map((joke, index) =>
            {
                return (<div key={index} style={{border:'1px solid black'}}>
                    {joke.joke}
                </div>)

            })}
        </>
    )
}

export default Home