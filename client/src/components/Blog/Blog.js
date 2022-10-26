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
        <div key={id} className="col-sm">
          <div className="card">
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
              <input rows="3"
                // placeholder={post.pub_date}
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
        <div className="row">{displayBlogPosts}</div>
        <PostEntry entry={entry} createPost={createPost} handleEntry={handleEntry} />
      </div>

    </div>
  );

  // const [name, setName] = useState("");
  // const [genre, setGenre] = useState("");
  // const [starring, setStarring] = useState("");
  // const [movieId, setMovieId] = useState(null);
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   refreshMovies();
  // }, []);

  // const refreshMovies = () => {
  //   const token = JSON.parse(localStorage.getItem("token"));

  //     const config = {
  //       method: "get",
  //       url: "api/viewall/",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     client(config)
  //     .then((res) => {
  //       setMovies(res.data);
  //     })
  //     .catch(console.error);
  //   }

  // const onSubmit = (e) => {
  //   // e.preventDefault();
  //   // let item = { name, genre, starring };
  //   // API.post("/", item).then(() => refreshMovies());
  // };

  // const onUpdate = (id) => {
  //   // let item = { name };
  //   // API.patch(`/${id}/`, item).then((res) => refreshMovies());
  // };

  // const onDelete = (id) => {
  //   const token = JSON.parse(localStorage.getItem("token"));

  //   const config = {
  //     method: "delete",
  //     url: `/api/delete/${id}`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   client(config).then((res) => refreshMovies());
  // };

  // function selectMovie(id) {
  //   // let item = movies.filter((movie) => movie.id === id)[0];
  //   // setName(item.name);
  //   // setGenre(item.genre);
  //   // setStarring(item.starring);
  //   // setMovieId(item.id);
  // }

  // return (
  //   <div className="container mt-5">
  //     <div className="row">
  //       <div className="col-md-4">
  //         <h3 className="float-left">Create a new Movie</h3>
  //         <form onSubmit={onSubmit} className="mt-4">
  //           <form className="mb-3" controlId="formBasicName">
  //             <label>{movieId}Name</label>
  //             <input
  //               type="text"
  //               placeholder="Enter Name"
  //               value={name}
  //               onChange={(e) => setName(e.target.value)}
  //             />
  //           </form>

  //           <form className="mb-3" controlId="formBasicGenre">
  //             <label>Genre</label>
  //             <input
  //               type="text"
  //               placeholder="Enter Genre"
  //               value={genre}
  //               onChange={(e) => setGenre(e.target.value)}
  //             />
  //           </form>

  //           <form className="mb-3" controlId="formBasicStarring">
  //             <label>Starring</label>
  //             <input
  //               type="text"
  //               placeholder="Enter Starring"
  //               value={starring}
  //               onChange={(e) => setStarring(e.target.value)}
  //             />
  //           </form>

  //           <div className="float-right">
  //             <button
  //               variant="primary"
  //               type="submit"
  //               onClick={onSubmit}
  //               className="mx-2"
  //             >
  //               Save
  //             </button>
  //             <button
  //               variant="primary"
  //               type="button"
  //               onClick={() => onUpdate(movieId)}
  //               className="mx-2"
  //             >
  //               Update
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //       <div className="col-md-8 m">
  //         <table class="table">
  //           <thead>
  //             <tr>
  //               <th scope="col">#</th>
  //               <th scope="col">Movie Name</th>
  //               <th scope="col">Genre</th>
  //               <th scope="col">Starring</th>
  //               <th scope="col"></th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {movies.map((blog, index) => {
  //               return (
  //                 <tr key="">
  //                   <th scope="row">{blog.id}</th>
  //                   <td> {blog.title}</td>
  //                   <td>{blog.text}</td>
  //                   <td>{blog.pub_date}</td>
  //                   <td>
  //                     <i
  //                       className="fa fa-pencil-square text-primary d-inline"
  //                       aria-hidden="true"
  //                       onClick={() => selectMovie(blog.id)}
  //                     ></i>
  //                     <button
  //                       className="fa fa-trash-o text-danger d-inline mx-3"
  //                       aria-hidden="true"
  //                       onClick={() => onDelete(blog.id)}
  //                     >DELETE</button>
  //                   </td>
  //                 </tr>
  //               );
  //             })}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Blog;
