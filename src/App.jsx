import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register'
import Loading from './pages/LoadingFirst'
import Login from './pages/Login'
import ChangePassword from './pages/Changepassword';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Loading />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </Router>
  )
}

export default App