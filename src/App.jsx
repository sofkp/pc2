import { 
	BrowserRouter as Router, 
	Routes, 
	Route,
	Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import {Dashboard} from './pages/Dashboard'
import { EditProduct } from './pages/EditProduct'
function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login"/>} />
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/producto/edit" element={<EditProduct/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App