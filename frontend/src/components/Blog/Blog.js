import React from "react";
import PostEntry from "../PostEntry/PostEntry";

import { useEffect, useState } from "react";
import client from "../../utils/client";

const Blog = () => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState([]);
  const [entry, setEntry] = useState([])


  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    const config = {
      method: "get",
      url: "api/viewall/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    client(config)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch(console.error);
  }

  const changeForm = (event, id) => {
    const { name, value } = event.target;
    setForm((state) => ({ ...state, [[id] + " " + name]: value }));

  };
  const handleEntry = (event) => {
    const { name, value } = event.target;
    setEntry((state) => ({ ...state, [name]: value }));
  };

  const createPost = (e) => {
    e.preventDefault();
    const postTitle = entry.title
    const postText = entry.text
    const postDate = entry.date

    const token = JSON.parse(localStorage.getItem("token"));
    const data = JSON.stringify({
      "title": postTitle,
      "text": postText,
      "pub_date": postDate
    });
    const config = {
      method: 'POST',
      url: `/api/create/`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };
    client(config)
      .then(res => getPosts())
      .then(error => console.log(error))
  }

  const updatePost = (e, { id, title, text, pub_date }) => {
    e.preventDefault();
    const postTitle = form[`${id} title`] || title
    const postText = form[`${id} text`] || text
    const postDate = form[`${id} date`] || pub_date
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
    client(config)
      .then(res => getPosts())
      .then(error => console.log(error))
  }

  console.log(form)

  const deletePost = (e, { id }) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const config = {
      method: "delete",
      url: `/api/delete/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    client(config)
      .then((res) => getPosts())
      .then(error => console.log(error))

  }

  const displayBlogPosts =
    blogs &&
    blogs.map((post, id) => {
      return (
        <div key={id} className="col col-md-4  mt-3">
          <div className="card custom-card">
            <div className="card-body">
              <input
                onChange={(e) => changeForm(e, post.id)}
                name="title"
                className="form-control form-control-lg mb-4"
                type="text"
                placeholder={post.title}
                value={form[`${id} title`]}
              />
        
              <textarea
                onChange={(e) => changeForm(e, post.id)}
                name="text"
                placeholder={post.text}
                value={form[`${id} text`]}
                className="form-control mb-4"
                id="exampleFormControlTextarea1"
                rows="3"
              />

                <input
                className="form-control form-control-lg mb-4"
                type="text"
                placeholder={`Current date: ${post.pub_date}`}
              />
              <input rows="3"
                className="form-control mb-4"
                onChange={(e) => changeForm(e, post.id)}
                name="date" type="date" id="start"
                value={form[`${id} date`]}
                min="2018-01-01" max="2050-12-31" />

              <button
                type="button"
                onClick={(e) => updatePost(e, post)}
                className="btn btn-success m-2 "
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
      <h1 className="mb-4 text-center">Blog Posts</h1>
      <div className="d-flex justify-content-between">
        <div className="row custom-row">{displayBlogPosts}</div>
        <PostEntry entry={entry} createPost={createPost} handleEntry={handleEntry} />
      </div>

    </div>
  );
};

export default Blog;
