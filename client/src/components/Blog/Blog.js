import React from "react";
import { useEffect, useState } from "react";
import client from "../../utils/client";
import axios from "axios";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const config = {
        method: "get",
        url: "api/viewall/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await client(config);
      console.log(response.data);
      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeForm = (event, id) => {
    const { name, value } = event.target;
    console.log('NAME, VALIUE', name, value);
    const test =  {[name]: value}
    setForm((state) => ({ ...state,test }));

    // setForm((state) => ({ ...state, [name]: value }));
  };

  console.log(form)

  const updatePost = (e, { id }) => {
    e.preventDefault();
    console.log(id);
    console.log(form)
  };

  const displayBlogPosts =
    blogs &&
    blogs.map((post, id) => {
      return (
        <div key={id} className="col-sm">
          <div className="card">
            <div className="card-body">
              <input
                onChange={(e)=>changeForm(e,id)}
                name="title"
                className="form-control form-control-lg mb-4"
                type="text"
                placeholder=".form-control-lg"
                defaultValue={post.title}
              />

              <textarea
                onChange={(e)=>changeForm(e,id)}
                name="text"
                defaultValue={post.text}
                className="form-control mb-4"
                id="exampleFormControlTextarea1"
                rows="3"
              />
              <p>{post.pub_date}</p>

              <button
                type="button"
                onClick={(e) => updatePost(e, post)}
                className="btn btn-success m-2"
              >
                Edit Post
              </button>

              <button type="button" className="btn btn-danger">
                Delete Post
              </button>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="container">
      <h1 className="mb-4">Blog Posts</h1>
      <div className="row">{displayBlogPosts}</div>
    </div>
  );
};

export default Blog;
