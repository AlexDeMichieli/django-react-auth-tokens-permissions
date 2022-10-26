import React from "react";
import PostEntry from "../PostEntry/PostEntry";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import client from "../../utils/client";

const Blog = () => {
  let navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState([]);
  const [entry, setEntry] = useState([])


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
      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeForm = (event, id) => {
    const { name, value } = event.target;
    setForm((state) => ({ ...state, [[id] + " " + name]: value }));

  };
  const handleEntry = (event) => {
    const { name, value } = event.target;
    setEntry((state) => ({ ...state, [name]: value }));
  };

  const createPost = async (e) => {
    e.preventDefault();
    console.log(entry)
    try {
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
      const response = await client(config);
      console.log(response.data)
      getPosts()

    } catch (error) {
      console.log(error)
    }
  }

  const updatePost = async (e, { id, title, text, pub_date }) => {
    e.preventDefault();

    try {
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
      const response = await client(config);
      getPosts()

    } catch (error) {
      console.log(error)
    }
  }

  const deletePost = async (e, { id }) => {
    
    // const currentList = [...blogs]
    // console.log("POST ID", id)
    // const currentPost = currentList.find(item=>item.id == id )
    // const postIndex = currentList.indexOf(currentPost)

    try {
      // currentList.splice(postIndex, 1)
      // setBlogs(currentList)
      const token = JSON.parse(localStorage.getItem("token"));
      const config = {
        method: 'DELETE',
        url: `/api/delete/${id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

    setTimeout(function () {
      client(config).then(function (response) {
        getPosts()
      })
      .catch(function (error) {
        console.log(error);
      });
    }, 500);
    
      // const response = await client(config);
      // const refresh = await getPosts()
      // currentList.splice(postIndex, 1);
      // setBlogs(currentList)
      // console.log("BLOGS",blogs)
      // getPosts()
     
    } catch (error) {
      console.log(error)
    }

  }

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
                placeholder="enter the title"
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
              <input  rows="3" className="form-control mb-4" onChange={(e) => changeForm(e, post.id)} name="date" type="date" id="start"
                defaultValue={post.pub_date}
                min="2018-01-01" max="2050-12-31" />
              
              <p>{post.id}</p>

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
      <div className="row">{displayBlogPosts}</div>
      <PostEntry entry={entry} createPost={createPost} handleEntry={handleEntry} />
      </div>
     
    </div>
  );
};

export default Blog;
