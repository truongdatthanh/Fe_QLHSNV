// import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Layout from './layouts/Layout';
// import Dashboard from './pages/Dashboard';
// import EmployeeManagement from './pages/EmployeeManagement';
// import DepartmentManagement from './pages/DepartmentManagement';
// import PositionManagement from './pages/PositionManagement';
// import EmploymentContractManagement from './pages/EmploymentContractManagement';
// import AddEmployee from './pages/AddEmployee';
// import ScrollToTop from './components/ScrollToTop';
// import RecruitmentManagementPage from './pages/RecruitmentManagementPage';
// import ReportManagements from './pages/ReportManagement';
// import Login from './pages/Login';



// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <ScrollToTop />
//         <Routes>
//           <Route path='/auth/login' element={<Layout Component={Login} />} />
//           <Route path='/' element={<Layout Component={EmployeeManagement} />} />
//           <Route path='/employees/add' element={<Layout Component={AddEmployee} />} />
//           <Route path='/departments' element={<Layout Component={DepartmentManagement} />} />
//           <Route path='/positions' element={<Layout Component={PositionManagement} />} />
//           <Route path='/contracts' element={<Layout Component={EmploymentContractManagement} />} />
//           <Route path='/recruitment' element={<Layout Component={RecruitmentManagementPage} />} />
//           <Route path='/reports' element={<Layout Component={ReportManagements} />} />
//         </Routes>
//       </BrowserRouter >
//     </>
//   );
// }

// export default App;


import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import EmployeeManagement from './pages/EmployeeManagement';
import DepartmentManagement from './pages/DepartmentManagement';
import PositionManagement from './pages/PositionManagement';
import EmploymentContractManagement from './pages/EmploymentContractManagement';
import AddEmployee from './pages/AddEmployee';
import ScrollToTop from './components/ScrollToTop';
import RecruitmentManagementPage from './pages/RecruitmentManagementPage';
import ReportManagements from './pages/ReportManagement';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectRoute';
import Register from './pages/Register';


function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Login Route (Không cần bảo vệ) */}
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />

          {/* Các Route cần đăng nhập */}
          <Route path='/' element={
            <ProtectedRoute>
              <Layout Component={EmployeeManagement} />
            </ProtectedRoute>
          } />
          <Route path='/employees/add' element={
            <ProtectedRoute>
              <Layout Component={AddEmployee} />
            </ProtectedRoute>
          } />
          <Route path='/departments' element={
            <ProtectedRoute>
              <Layout Component={DepartmentManagement} />
            </ProtectedRoute>
          } />
          <Route path='/positions' element={
            <ProtectedRoute>
              <Layout Component={PositionManagement} />
            </ProtectedRoute>
          } />
          <Route path='/contracts' element={
            <ProtectedRoute>
              <Layout Component={EmploymentContractManagement} />
            </ProtectedRoute>
          } />
          <Route path='/recruitment' element={
            <ProtectedRoute>
              <Layout Component={RecruitmentManagementPage} />
            </ProtectedRoute>
          } />
          <Route path='/reports' element={
            <ProtectedRoute>
              <Layout Component={ReportManagements} />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;