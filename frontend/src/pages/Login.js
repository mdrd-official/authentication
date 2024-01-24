import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/userServices';
import { setData } from '../features/auth/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please fill all the fields');
      return;
    }
    const response = await loginUser({ username, password }); 
    if(response.error){
      alert(response.error);
      return;
    }else{
      console.log(response.message);    
      dispatch(setData(response.user));
      navigate('/');
    }
    
   
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form>
                <div className="">
                  <label htmlFor="username" className="form-label"></label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="form-label"></label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
