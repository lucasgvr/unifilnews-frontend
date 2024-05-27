import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import { FaUserLock } from "react-icons/fa";

import '../styles/signin.scss'

import axios from 'axios'

export function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn, error } = useAuth()

    const navigate = useNavigate()

    async function handleSignIn(event) {
        event.preventDefault()

        try {
            await signIn(email, password)

            navigate('/')
        } catch (error) {
            console.error('Login failed: ', error)
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
                <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} />
            </div>
            <button>Sign In</button>
            <Link to='/signup' className='signInLink'>Don't have an account? <span>Sign Up</span></Link>
            {error && <div>{error}</div>}
        </form>
    )
}