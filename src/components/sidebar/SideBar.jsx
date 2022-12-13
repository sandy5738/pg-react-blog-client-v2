import { axiosInstance } from "../../config";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const response = await axiosInstance.get("/categories");
      setCats(response.data);
    };
    getCats();
    // return () => {
    //   cleanup
    // };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <span className="sidebar-title">ABOUT ME</span>
        <img
          src="https://images.pexels.com/photos/13702948/pexels-photo-13702948.jpeg?cs=srgb&dl=pexels-urtimud-13702948.jpg&fm=jpg"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In dolor at
          ratione nulla quibusdam perferendis.
        </p>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-title">CATEGORIES</span>
        <ul className="sidebar-list">
          {cats.map((cat) => (
            <Link
              to={`/pg-react-blog-client-v2/?cat=${cat.name}`}
              className="link"
            >
              <li className="sidebar-list-item">{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-title">FOLLOW US</span>
        <div className="sidebar-social">
          <i className="sidebar-icon fa-brands fa-facebook-f"></i>
          <i className="sidebar-icon fa-brands fa-twitter"></i>
          <i className="sidebar-icon fa-brands fa-pinterest-p"></i>
          <i className="sidebar-icon fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
