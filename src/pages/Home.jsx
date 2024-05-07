import axios from 'axios'

import '../styles/home.scss'

import { useEffect, useState } from 'react'

export function Home() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000')
            .then(response => setUsers(response.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='homeContainer'>
            <table className='homeTable'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>CPF</th>
                        <th>Phone</th>
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
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            

        </div>
    )
}