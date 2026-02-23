import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Home from './components/pages/Home'
import Shop from './components/shop/Shop'
import DashboardRoot from './components/Admin/Dashboard/DashboardRoot'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/dashboard" element={<DashboardRoot />}>
            {/* <Route index element={<OverviewCards />} />
            <Route path="analytics" element={<Anaylitics />} />
            <Route path="widget" element={<ChatWidget />} /> */}

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
