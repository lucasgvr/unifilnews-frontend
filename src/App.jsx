import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import SignInClass from './pages/SignInClass'
import { SignUp } from './pages/SignUp'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/signin' element={<SignIn />} ></Route>
            <Route path='/signup' element={<SignUp />} ></Route>
            <Route path='/signin-class' element={<SignInClass />} ></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App