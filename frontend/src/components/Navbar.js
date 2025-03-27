import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleCreateLecture = () => {
    console.log("Create Lecture button clicked"); // Debugging
    navigate('/create-lecture'); // Navigate to the CreateLecture page
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Muslim Web</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.username}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
           <button
  onClick={handleCreateLecture}
  className="mr-4 bg-purple-500 px-3 py-1 rounded"
>
  Create Lecture
</button>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register" className="bg-green-500 px-3 py-1 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;