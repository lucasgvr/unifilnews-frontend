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

    const [isTokenExpired, setIsTokenExpired] = useState(false)

    const { signOut } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        const toastId = toast.loading('Loading')
    
        const response = axios.post('http://localhost:8000/token', { token, id })
            .then(response => {
                if(response.data == true) {
                    setIsTokenExpired(true)
                    toast.error('Session expired', {
                        id: toastId
                    })
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                } 
            }).catch(error => {
                console.log(error)
            })
    }, [])

    return (
        isTokenExpired ?  
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