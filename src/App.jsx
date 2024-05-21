import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<PrivateRoute />} >
                <Route path='/' element={<Home />} />
              </Route>
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App