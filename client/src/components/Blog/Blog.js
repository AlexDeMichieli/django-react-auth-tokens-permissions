import React from 'react'
import { useEffect, useState } from 'react'
import client from '../../utils/client'
import axios from 'axios'
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
  }, []);


  const getPosts = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const config = {
        method: 'get',
        url: 'api/viewall/',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await client(config)
      console.log(response.data)
      setBlogs(response.data)
    } catch (error) {
      console.log(error)
    }




  };

  return (
    <div>
      <p>Blog</p>
    </div>
  )
}

export default Blog