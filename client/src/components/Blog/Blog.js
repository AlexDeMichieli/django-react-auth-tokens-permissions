import React from "react";
import { useEffect, useState } from "react";
import client from "../../utils/client";

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
    setForm((state) => ({ ...state, [[id] + " " + name]: value }));

  };

  const updatePost = async (e, { id, title, text, pub_date }) => {
    e.preventDefault();

    try {
      const postTitle = form[`${id} title`] || title
      const postText = form[`${id} text`] || text
      const postDate = form[`${id} date`] || pub_date
      console.log('DATE',pub_date)
      const token = JSON.parse(localStorage.getItem("token"));
      const data = JSON.stringify({
        "title": postTitle,
        "text": postText,
        "pub_date": postDate
      });
      const config = {
        method: 'PUT',
        url: `/api/edit/${id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: data
      };
      const response = await client(config);
      getPosts()

    } catch (error) {
      console.log(error)
    }
  }

  const deletePost = async (e, { id, title, text }) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const config = {
        method: 'DELETE',
        url: `/api/delete/${id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      const response = await client(config);
      getPosts()
    } catch (error) {
      console.log(error)
    }
  }

console.log(form)
  const displayBlogPosts =
    blogs &&
    blogs.map((post, id) => {
      return (
        <div key={id} className="col-sm">
          <div className="card">
            <div className="card-body">
              <input
                onChange={(e) => changeForm(e, post.id)}
                name="title"
                className="form-control form-control-lg mb-4"
                type="text"
                placeholder=".form-control-lg"
                defaultValue={post.title}
              />

              <textarea
                onChange={(e) => changeForm(e, post.id)}
                name="text"
                defaultValue={post.text}
                className="form-control mb-4"
                id="exampleFormControlTextarea1"
                rows="3"
              />
              <input onChange={(e) => changeForm(e, post.id)} name="date" type="date" id="start"
                defaultValue={post.pub_date}
                min="2018-01-01" max="2050-12-31" />


              <button
                type="button"
                onClick={(e) => updatePost(e, post)}
                className="btn btn-success m-2"
              >
                Edit Post
              </button>

              <button onClick={(e) => deletePost(e, post)} type="button" className="btn btn-danger">
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
