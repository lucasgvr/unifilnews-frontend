import { Link } from 'react-router-dom';
import '../styles/signup.scss'

import { FaUserLock } from "react-icons/fa";

export function SignUp() {
    return (
        <form className="signUpContainer">
            <div className='iconContainer'>
                <FaUserLock color='#fff'/>
            </div>
            <p className='signUpTitle'>Sign Up</p>
            <div className='formContainer'>
                <div className='inputLine'>
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                </div>
                <input type="text" placeholder="Email Address"/>
                <input type="text" placeholder="Password" />
                <input type="text" placeholder="CPF" />
                <input type="text" placeholder="Telefone" />
            </div>
            <button>Sign Up</button>
            <Link to='/signin' className='signInLink'>Already have an account? <span>Sign In</span></Link>
        </form>
    )
}