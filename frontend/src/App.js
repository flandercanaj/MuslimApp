import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from './pages/AdminDashboard';
import MainPage from "./pages/mainPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const { user } = useContext(AuthContext);

  if (user === undefined) {
    return <div>Loading...</div>; // Prevent Navigate before data is loaded
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={user ? (user.role === "admin" ? <Navigate to="/admin-dashboard" /> : <Navigate to="/mainpage" />) : <Navigate to="/login" />} 
        />
        
        <Route 
          path="/login" 
          element={!user ? <LoginPage /> : <Navigate to="/" />} 
        />

        <Route 
          path="/register" 
          element={!user ? <RegisterPage /> : <Navigate to="/" />} 
        />

        <Route 
          path="/admin-dashboard" 
          element={user && user.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/mainpage" 
          element={user && user.role === "user" ? <MainPage /> : <Navigate to="/login" />} 
        />

      </Routes>
    </Router>
  );
}

export default App;
