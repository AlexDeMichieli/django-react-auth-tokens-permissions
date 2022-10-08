import React from 'react'
import { useEffect, useState } from 'react'


const Login = () => {

  const [form, setForm] = useState({});

  const changeForm = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setForm((state) => ({ ...state, [name]: value }));
  };

  const getToken = async (e) => {
    e.preventDefault();
    console.log(form)
    const headerConfig = { headers: { "Content-Type": "application/json" } };
    const data = {
    
    };
    try {
      // await axios.post("/api/posts", data, headerConfig).then((res) => {
      //   console.log(res);
      // });
   
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <form onSubmit={(e) => getToken(e)} className='mt-4'>
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