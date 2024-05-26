import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import axios from 'axios'
import { Header } from "../components/Header"
import { Loader } from "../components/Loader"

import '../styles/user.scss'
import { useAuth } from "../hooks/useAuth"

export function UserPage() {
    const { id } = useParams()

    const [userPage, setUserPage] = useState(null)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [cpf, setCpf] = useState('')
    const [phone, setPhone] = useState('')

    const [selectedFile, setSelectedFile] = useState(null)

    const location = useLocation()
    const navigate = useNavigate()

    const { user } = useAuth()

    useEffect(() => {
        const getUser = async (id) => {
            try {
                const response = await axios.get(`http://localhost:8000/user?id=${id}`)
    
                setUserPage(response.data.user)
            } catch (error) {
                console.error('Failed to fetch user: ', error)
            } 
        }

        getUser(id)
    }, [userPage])

    const handleFileChange = event => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUpload = async (event) => {
        event.preventDefault()

        const formData = new FormData();

        formData.append('firstName', firstName === '' ? user.firstName : firstName)

        formData.append('lastName', lastName);
        formData.append('email', email);
        
        formData.append('cpf', cpf);
        formData.append('phone', phone);
        formData.append('image', selectedFile);

        formData.append('id', user.id)

        console.log(formData)
        
        axios.post('http://localhost:8000/upload', formData)
        .then(response => {
            if(response.data.Status === 'Success') {
                console.log('Image uploaded')
                navigate('/')
            } else {
                console.log('Error while uploading image')
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <>
            {!userPage ? <Loader /> : 
            <>
                <Header />

                {`/user/${user.id}` === location.pathname ? 
                <form className="userEditContainer" onSubmit={handleUpload}>
                    <div className='formContainer'>
                        <img src={`http://localhost:8000/images/${user.image}`} alt="" />
                        <div className='inputLine'>
                            <input defaultValue={user.firstName} type="text" placeholder="First Name" onChange={event => setFirstName(event.target.value)} />
                            <input defaultValue={user.lastName} type="text" placeholder="Last Name" onChange={event => setLastName(event.target.value)} />
                        </div>
                        <input defaultValue={user.email} type="text" placeholder="Email Address" onChange={event => setEmail(event.target.value)} />
                        <div className='inputLine'>
                            <input type="text" placeholder="New Password" onChange={event => setNewPassword(event.target.value)} />
                            <input type="text" placeholder="Confirm New Password" onChange={event => setConfirmNewPassword(event.target.value)} />
                        </div>
                        <input defaultValue={user.cpf} type="text" placeholder="CPF" onChange={event => setCpf(event.target.value)} />
                        <input defaultValue={user.phone} type="text" placeholder="Telefone" onChange={event => setPhone(event.target.value)} />
                    </div>
                    <div className="uploadContainer">
                        <label className="fileInput">
                            Choose Image: {selectedFile?.name}
                            <input type="file" onChange={handleFileChange} />
                        </label>
                    </div>
                    <button>Save</button>
                </form>
                : 
                <div>
                    UserPage
                    <div>
                        <p>{userPage.id} {userPage.firstName} {userPage.lastName}</p>
                        <p>{userPage.email}</p>
                        <p>{userPage.cpf}</p>
                        <p>{userPage.phone}</p>
                    </div>
                </div>}
                
            </>
            }
        </>
    )
}