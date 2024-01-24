import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearData } from "../features/auth/userSlice";
import { logoutUser } from "../services/userServices";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userAuth);
  

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearData());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="container navbar navbar-expand-lg navbar-light bg-light ">
      <Link to="/" className="navbar-brand">
        Home
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleLogout}
                >
                  Logout
                </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
