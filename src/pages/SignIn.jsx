import { Link } from 'react-router-dom';
import '../styles/signin.scss'

import { FaUserLock } from "react-icons/fa";

export function SignIn() {
    return (
        <form className="signInContainer">
            <div className='iconContainer'>
                <FaUserLock color='#fff'/>
            </div>
            <p className='signInTitle'>Sign In</p>
            <div className='formContainer'>
                <input type="text" placeholder="Email Address"/>
                <input type="text" placeholder="Password" />
            </div>
            <button>Sign In</button>
            <Link to='/signup' className='signInLink'>Don't have an account? <span>Sign Up</span></Link>
        </form>
    )
}