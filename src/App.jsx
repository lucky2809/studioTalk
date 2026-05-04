import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Home from './components/pages/Home'
import Shop from './components/shop/Shop'
import DashboardRoot from './components/Admin/Dashboard/DashboardRoot'
import { useEffect } from 'react'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import AllUser from './components/Admin/AllUser'
import { AuthProvider } from './components/Auth/AuthProvider'
import UploadProduct from './components/Admin/UploadProduct'
import UploadImage from './components/Admin/UploadImage'
import ProductDetail from './components/pages/ProductDetail'
import Illustration from './components/pages/Illustration'
import PublicRoute from './components/Auth/PublicRoute'
import Checkout from './components/pages/Checkout'
import UserDashboard from './components/Admin/Dashboard/UserDashboard'

function App() {

  // ✅ ScrollToTop component
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]); // runs on every route/path change

    return null;
  }

  return (
    <>
      <BrowserRouter>
        {/* ✅ Place it inside Router but outside Routes */}
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/illustration" element={<Illustration />} />
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/signup' element={<Signup />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard2" element={<UserDashboard />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardRoot /></ProtectedRoute>}>
              <Route path="uploadimage" element={<UploadImage />} />
              <Route path="all-users" element={<AllUser />} />
              <Route path="upload-product" element={<UploadProduct />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
