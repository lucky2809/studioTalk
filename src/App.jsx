import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Home from './components/pages/Home'
import Shop from './components/shop/Shop'

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
