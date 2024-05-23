import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

import PrivateRoute from './PrivateRoute'
import AuthRoute from './AuthRoute'


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<PrivateRoute />} >
                        <Route path='/' element={<Home />} />
                    </Route>

                    <Route path='/login' element={<AuthRoute />} >
                        <Route path='/login' element={<SignIn />} />
                    </Route>

                    <Route path='/signup' element={<AuthRoute />} >
                        <Route path='/signup' element={<SignUp />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App