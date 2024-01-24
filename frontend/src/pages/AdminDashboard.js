import React, { useEffect, useState } from "react";
import { clearData, setData } from "../features/auth/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getUserLists, deleteUser,  } from "../services/adminServices";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isAuthenticated } = useSelector((state) => state.adminAuth);


  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await getUserLists();
        setUsers(response);
        
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  },[]);

  const handleAddUser = () => {
    navigate("/add-user");
  };

  const handleLogout = async () => {
    try {
      dispatch(clearData());
      navigate("/admin-login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (index) => {
    navigate("/edit-user/" + index);
  };
  
  const handleDelete = async(index) => {
    const response = await deleteUser(index);
    console.log(response);
    navigate("/dashboard");
  };
  return (
    <>
      <nav className="container navbar navbar-expand-lg navbar-light bg-light ">
        <Link to="/" className="navbar-brand">
          Admin Dashboard
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={handleAddUser}
                >
                  Add User
                </button>
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
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.fullName}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td onClick={() => handleEdit(user._id)}>
                    <FaEdit />
                  </td>
                  <td onClick={()=>handleDelete(user._id)}>
                    <FaTrash />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AdminDashboard;
