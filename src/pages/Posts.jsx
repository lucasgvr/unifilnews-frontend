import { Loader } from "../components/Loader";
import { Header } from "../components/Header";

import { useState, useEffect } from 'react';
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

import '../styles/posts.scss'

import Modal from 'react-modal'
import { IoMdClose } from "react-icons/io";




export function Posts() {
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("userId")

    const { signOut } = useAuth()

    const [validToken, setValidToken] = useState(true)

    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [postContent, setPostContent] = useState('')

    function openModal() {
        setIsModalOpen(true);
    }
    
    function closeModal() {
        setIsModalOpen(false);
    }

    Modal.setAppElement('#root')

    function handleCreatePost() {
        axios.post('http://localhost:8000/posts/new', {
            id,
            postContent
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

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
            <Modal 
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="modalContainer"
                style={{ overlay: {background: 'rgba(0, 0, 0, 0.5)'} }}
            >
                <div className="modalContent">
                    <h1 className="title">New Post</h1>
                    <IoMdClose className="closeButton" onClick={closeModal}>Close</IoMdClose>
                    <textarea className="textInput" maxLength={1000} onChange={event => setPostContent(event.target.value)}></textarea>
                    <button className="postButton" onClick={handleCreatePost}>Post</button>
                </div>
            </Modal>
            <div className="postsContainer">
                <div style={{ display: 'none' }}>
                    <h1>Posts</h1>
                    <textarea autoFocus maxLength={1000} placeholder='teste'/>
                </div>

                <div className="postContainerHeader">
                    <h1>Posts</h1>
                    <button onClick={openModal}>+ New Post  </button>
                </div>

                <div className="post">
                    <div className="postHeader">
                        <p>imagem</p>
                        <p>Lucas</p>
                        <p>16h</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugit eos omnis dolore dolor possimus quo repudiandae ducimus ab, quae deleniti autem quidem est, sapiente beatae repellendus cupiditate doloremque delectus!</p>
                    <div className="postFooter">
                        <p>like</p>
                        <p>comment</p>
                    </div>
                </div>
                <div className="post">
                    <div className="postHeader">
                        <p>imagem</p>
                        <p>Lucas</p>
                        <p>16h</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugit eos omnis dolore dolor possimus quo repudiandae ducimus ab, quae deleniti autem quidem est, sapiente beatae repellendus cupiditate doloremque delectus!</p>
                    <div className="postFooter">
                        <p>like</p>
                        <p>comment</p>
                    </div>
                </div>
                <div className="post">
                    <div className="postHeader">
                        <p>imagem</p>
                        <p>Lucas</p>
                        <p>16h</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugit eos omnis dolore dolor possimus quo repudiandae ducimus ab, quae deleniti autem quidem est, sapiente beatae repellendus cupiditate doloremque delectus!</p>
                    <div className="postFooter">
                        <p>like</p>
                        <p>comment</p>
                    </div>
                </div>
                <div className="post">
                    <div className="postHeader">
                        <p>imagem</p>
                        <p>Lucas</p>
                        <p>16h</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugit eos omnis dolore dolor possimus quo repudiandae ducimus ab, quae deleniti autem quidem est, sapiente beatae repellendus cupiditate doloremque delectus!</p>
                    <div className="postFooter">
                        <p>like</p>
                        <p>comment</p>
                    </div>
                </div>
            </div>
        </div>
    )
}