import { PF } from "../../config";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

const TopBar = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
  };
  // const PF = "http://localhost:5000/images";

  return (
    <div className="top">
      <div className="top-left">
        <i className="top-icon fa-brands fa-facebook-f"></i>
        <i className="top-icon fa-brands fa-twitter"></i>
        <i className="top-icon fa-brands fa-pinterest-p"></i>
        <i className="top-icon fa-brands fa-instagram"></i>
      </div>
      <div className="top-center">
        <ul className="top-list">
          <li className="top-list-item">
            <Link to="/pg-react-blog-client-v2/" className="link">
              HOME
            </Link>
          </li>
          <li className="top-list-item">
            <Link to="/pg-react-blog-client-v2/" className="link">
              ABOUT
            </Link>
          </li>
          <li className="top-list-item">
            <Link to="/pg-react-blog-client-v2/" className="link">
              CONTACT
            </Link>
          </li>
          <li className="top-list-item">
            <Link to="/pg-react-blog-client-v2/write" className="link">
              WRITE
            </Link>
          </li>
          <li className="top-list-item" onClick={handleLogOut}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="top-right">
        {user ? (
          <Link to="/pg-react-blog-client-v2/settings">
            <img className="top-img" src={PF + user.profilepicture} alt="" />
          </Link>
        ) : (
          <ul className="top-list">
            <li className="top-list-item">
              <Link to="/pg-react-blog-client-v2/login" className="link">
                LOGIN
              </Link>
            </li>
            <li className="top-list-item">
              <Link to="/pg-react-blog-client-v2/register" className="link">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="top-search-icon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default TopBar;
