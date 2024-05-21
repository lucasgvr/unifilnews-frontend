import { Link } from 'react-router-dom';

import { FaUserLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import '../styles/signin.scss'
import { useState } from 'react';

export function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    async function handleSignIn(event) {
        event.preventDefault()

        try {
            const response = await axios.post('http://localhost:8000/signin', { email, password })

            const { token } = response.data

            localStorage.setItem('token', token)

            setToken(token)
            setError('')

            alert('Signed in')
            navigate('/')
        } catch (error) {
            setError('Invalid Credentials')
        }
    }

    return (
        <form className="signInContainer" onSubmit={handleSignIn}>
            <div className='iconContainer'>
                <FaUserLock color='#fff'/>
            </div>
            <p className='signInTitle'>Sign In</p>
            <div className='formContainer'>
                <input type="text" placeholder="Email Address" onChange={event => setEmail(event.target.value)}/>
                <input type="text" placeholder="Password" onChange={event => setPassword(event.target.value)} />
            </div>
            <button>Sign In</button>
            <Link to='/signup' className='signInLink'>Don't have an account? <span>Sign Up</span></Link>
            {error && <div>{error}</div>}
        </form>
    )
}