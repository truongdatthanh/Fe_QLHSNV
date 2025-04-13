import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectRoute';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import ProductPage from './pages/Product';
import ProductDetail from './pages/ProductDetails';
import About from './pages/AboutPage';
import Cart from './pages/CartPage';
import Order from './pages/OrderPage';
import ChangePassword from './pages/ChangePassword';



function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Login Route (Không cần bảo vệ) */}
          <Route path='/' element={<Layout Component={HomePage} />} />
          <Route path='/about' element={<Layout Component={About} />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />

          {/* Các Route cần đăng nhập */}
          <Route path='/products' element={
            <ProtectedRoute>
              <Layout Component={ProductPage} />
            </ProtectedRoute>
          } />

          <Route path='/products/:id' element={
            <ProtectedRoute>
              <Layout Component={ProductDetail} />
            </ProtectedRoute>
          } />

          <Route path='/carts' element={
            <ProtectedRoute>
              <Layout Component={Cart} />
            </ProtectedRoute>
          } />

          <Route path='/orders' element={
            <ProtectedRoute>
              <Layout Component={Order} />
            </ProtectedRoute>
          } />

          <Route path='/auth/change-password' element={
            <ProtectedRoute>
              <Layout Component={ChangePassword} />
            </ProtectedRoute>
          } />

        </Routes>


      </BrowserRouter>
    </>
  );
}

export default App;