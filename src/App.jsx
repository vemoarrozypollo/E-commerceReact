import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import Navigator from './components/Navigator'
import ProtectedRoutes from './components/ProtectedRoutes'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductsDetail from './pages/ProductsDetail'
import Purchases from './pages/Purchases'
import { getProductsThunk } from './store/slice/products.slice'

function App() {
  const isLoading = useSelector(state => state.isLoading)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])
  return (
    <HashRouter>
      <Navigator />
      {isLoading && <LoadingScreen />}
      <Container className='mt-4 ml-3 mr-3' >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<ProductsDetail />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/purchases' element={<Purchases />} />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
