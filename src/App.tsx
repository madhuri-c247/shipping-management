import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages
import Home from './pages/home'
import SignUp from './pages/signup'
import Login from './pages/login'
import Error from './pages/error'


function App() {
   return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<Error/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
