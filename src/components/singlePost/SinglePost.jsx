// import axios from "axios";
import { PF, axiosInstance } from "../../config";

import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";

import { Link, useLocation } from "react-router-dom";
import "./SinglePost.css";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  console.log(path);
  const [post, setPost] = useState({});
  // const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const response = await axiosInstance.get("/posts/" + path);
      setPost(response.data);
      setTitle(response.data.title);
      setDesc(response.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/pg-react-blog-client-v2/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singlepost">
      <div className="singlepost-wrapper">
        {post.photo && (
          <img className="singlepost-img" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlepost-title-input"
            autoFocus
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h1 className="singlepost-title">
            {title}
            {post.username === user?.username && (
              <div className="singlepost-edit">
                <i
                  className="singlepost-icon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlepost-icon fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlepost-info">
          <span className="singlepost-author">
            Author:
            <Link
              to={`/pg-react-blog-client-v2/?user=${post.username}`}
              className="link"
            >
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlepost-date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlepost-desc-input"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        ) : (
          <p className="singlepost-desc">{desc}</p>
        )}
        {updateMode && (
          <button className="single-post-button" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
