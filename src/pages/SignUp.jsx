import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios'

import toast, { Toaster } from 'react-hot-toast'

import { FaUserLock } from "react-icons/fa";

import '../styles/signup.scss'

export function SignUp() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpf, setCpf] = useState('')
    const [phone, setPhone] = useState('')

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()

        const toastId = toast.loading('Loading')

        axios.post('http://localhost:8000/signup', {
            firstName,
            lastName,
            email,
            password,
            cpf,
            phone
        }).then(response => {
            console.log(response)
            toast.success('User created', {
                id: toastId
            })

            setTimeout(() => {
                navigate('/')
            }, 2000)
        }).catch(error => {
            console.log(error)
            toast.error(`Error: ${error}`, {
                id: toastId
            })
        })
    }

    return (
        <form className="signUpContainer" onSubmit={handleSubmit}>
            <div className='iconContainer'>
                <FaUserLock color='#fff'/>
            </div>
            <p className='signUpTitle'>Sign Up</p>
            <div className='formContainer'>
                <div className='inputLine'>
                    <input type="text" placeholder="First Name" onChange={event => setFirstName(event.target.value)} />
                    <input type="text" placeholder="Last Name" onChange={event => setLastName(event.target.value)} />
                </div>
                <input type="text" placeholder="Email Address" onChange={event => setEmail(event.target.value)} />
                <input type="text" placeholder="Password"  onChange={event => setPassword(event.target.value)} />
                <input type="text" placeholder="CPF" onChange={event => setCpf(event.target.value)} />
                <input type="text" placeholder="Telefone" onChange={event => setPhone(event.target.value)} />
            </div>
            <button>Sign Up</button>
            <Link to='/signin' className='signInLink'>Already have an account? <span>Sign In</span></Link>
            <Toaster />
        </form>
    )
}