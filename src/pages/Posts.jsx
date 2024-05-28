import { Loader } from "../components/Loader";
import { Header } from "../components/Header";

import { useState, useEffect } from 'react';
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'



export function Posts() {
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("userId")

    const { signOut } = useAuth()

    const [validToken, setValidToken] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const validateToken = async () => {
            await axios.post('http://localhost:8000/token', { 
                token, 
                id 
            }).then(response => {
                if(response.data == false) {
                    console.log(response.data)
                    setValidToken(false)
                    toast.error('Session Expired', {
                        id: 1
                    })

                    setTimeout(() => {
                        navigate('/')
                        navigate(0)
                        signOut()
                    }, 2000)
                } else {
                    setValidToken(true)
                }
            }).catch(error => {
                console.log(error)
            })
        }

        validateToken()
    }, [validToken])

    return (
        !validToken ?  
        <div>
            <Toaster />
            <Loader />
        </div>
        :
        <div>
            <Header />
            Posts
        </div>
    )
}