import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';

import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectRoute';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard'; // Import Dashboard
function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        {/* Không bảo vệ */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Cần đăng nhập */}
        
        
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout Component={Products} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout Component={Dashboard} /> {/* Trang chủ là Dashboard */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Layout Component={Categories} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout Component={Users} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
