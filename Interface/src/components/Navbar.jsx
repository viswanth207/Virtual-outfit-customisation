import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Navbar.css'; // External CSS for styling
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice'; // Action to remove user from state

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the backend to expire the token
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      
      // Remove user from Redux store (if you want to reset the user state)
      dispatch(removeUser());

      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo-container">
        <img src="images/fs-removebg-preview.jpg" alt="Logo" className="logo" />
         <span className="owner-text">Owned by SAI VISWANTH CHIRUMAMILLA</span>
      </div>

      { !user && (  <div className="links-container">
          <ul>
          <li>
  <button onClick={() => navigate('/signup')} className="nav-link signup-button">Signup</button>
</li>

          </ul>
        </div>

     )}







      {/* Links Section */}
      {user && (
        <div className="links-container">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/customize" className="nav-link">Customize</Link>
            </li>
            <li>
              <Link to="/aigeneration" className="nav-link">AI</Link>
            </li>
            <li>
              <Link to="/seecart" className="nav-link">
                <i className="fas fa-shopping-cart"></i> {/* Font Awesome Cart Icon */}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
