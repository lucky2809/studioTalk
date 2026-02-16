import { BrowserRouter, Route, Routes } from 'react-router-dom'


import './App.css'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Home from './components/pages/Home'
import Shop from './components/pages/Shop'
import ProductCard from './components/pages/ProductCard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
