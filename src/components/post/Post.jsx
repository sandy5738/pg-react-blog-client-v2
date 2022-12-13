import { PF } from "../../config";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ post }) => {
  return (
    <div className="post">
      {post.photo && <img className="post-img" src={PF + post.photo} alt="" />}

      <div className="post-info">
        <div className="posts-cats">
          {post.categories.map((cat) => (
            <span className="post-cat">{cat.name}</span>
          ))}
        </div>
        <Link to={`/pg-react-blog-client-v2/post/${post._id}`} className="link">
          <span className="post-title">{post.title}</span>
        </Link>
        <hr />
        <span className="post-date">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="post-desc">{post.desc}</p>
    </div>
  );
};

export default Post;
