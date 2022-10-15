import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';

const Login = () => {

  const [form, setForm] = useState({});

  const changeForm = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setForm((state) => ({ ...state, [name]: value }));
  };

  const getToken = async (e, {user,password}) => {
    e.preventDefault();
    const headerConfig = { headers: { "Content-Type": "application/json" } };
    const data = {
      "username": user,
      "password": password
    };
    try {
      await axios.post("http://localhost:9000/api/token/", data, headerConfig).then((res) => {
        console.log(res.data)
        const token = {
          access_token: res.data.access,
          refresh_token: res.data.refresh
        }
        localStorage.setItem("token", JSON.stringify(token.access_token));
        localStorage.setItem("refreshToken", JSON.stringify(token.refresh_token));
      });
   
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <form onSubmit={(e) => getToken(e, form)} className='mt-4'>
      <div className="form-group">
        <label htmlFor="text-field">User Name</label>
        <input name="user" onChange={changeForm} type="text" className="form-control" id="text-field" aria-describedby="text-field" placeholder="Enter your username"/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input name="password" onChange={changeForm} type="password" className="form-control" id="password" placeholder="Password"/>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Submit</button>
    </form>
  )
}

export default Login