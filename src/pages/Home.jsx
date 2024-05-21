import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import axios from 'axios'

import { HiPencilAlt } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";

import '../styles/home.scss'
import { useAuth } from '../hooks/useAuth';

export function Home() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000')
            .then(response => setUsers(response.data))
            .catch(error => console.log(error))
    }, [])

    const { signOut } = useAuth()

    function handleUpdate() {
        // update function
    }

    function handleDelete() {
        // delete function
    }

    function handleSignOut() {
        signOut()
    }

    return (
        <div className='homeContainer'>
            <Link to='/signin'>Sign In</Link>
            <Link to='/signup'>Sign Up</Link>
            <button onClick={handleSignOut}>Log out</button>
            <table className='homeTable'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>CPF</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((data) => (
                            <tr key={data.id}>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.email}</td>
                                <td>{data.password}</td>
                                <td>{data.cpf}</td>
                                <td>{data.phone}</td>
                                <td className='buttons'>
                                    <button onClick={handleUpdate}>
                                        <HiPencilAlt />
                                    </button>
                                    <button onClick={handleDelete}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}