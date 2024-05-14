import axios from "axios";
import { Component } from "react";

class SignInClass extends Component {
    state = {
        username: '',
        password: '',
        token: '',
        error: ''
    }   

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSignIn = async () => {
        const { username, password } = this.state

        try {
            const response = await axios.post('http://localhost:3000/api/signin', { username, password })

            const { token } = response.data

            localStorage.setItem('token', token)

            this.setState({ token, error: '' })
        } catch (error) {
            this.setState({ error: 'Invalid Credentials' })
        }
    }

    render() {
        const { username, password, error } = this.state

        return (
            <div>
                Sign In Classe

                <input type="text" name="username" value={username} onChange={this.handleInputChange} />
                <input type="text" name="password" value={password} onChange={this.handleInputChange} />

                <button onClick={this.handleSignIn}>Sign In</button>

                {error && <div>{error}</div>}
            </div>
        )

    }
}

export default SignInClass