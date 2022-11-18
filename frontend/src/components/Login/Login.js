import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [form, setForm] = useState({});

  const changeForm = (event) => {
    const { name, value } = event.target;
    setForm((state) => ({ ...state, [name]: value }));
  };

  const getToken = async (e, { user, password }) => {
    e.preventDefault();
    const headerConfig = { headers: { "Content-Type": "application/json" } };
    const data = {
      "username": user,
      "password": password
    };
    try {
      await axios.post("http://0.0.0.0/api/token/", data, headerConfig).then((res) => {
        console.log(res.data)
        const token = {
          access_token: res.data.access,
          refresh_token: res.data.refresh
        }
        localStorage.setItem("token", JSON.stringify(token.access_token));
        localStorage.setItem("refreshToken", JSON.stringify(token.refresh_token));
        localStorage.setItem("isAuthenticated", true);
        navigate("/blog");
      });

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 mt-4 login">Login</h1>
          <form onSubmit={(e) => getToken(e, form)} className='mt-4'>
            <div className="form-group">
              <label className='form-label' htmlFor="text-field">User Name</label>
              <input name="user" onChange={changeForm} type="text" className="form-control" id="text-field" aria-describedby="text-field" placeholder="Enter your username" />
            </div>
            <div className="form-group">
              <label className='form-label mt-3' htmlFor="password">Password</label>
              <input name="password" onChange={changeForm} type="password" className="form-control" id="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary mt-4 mb-4">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login