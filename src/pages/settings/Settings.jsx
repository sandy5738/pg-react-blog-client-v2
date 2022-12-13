// import axios from "axios";
import { PF, axiosInstance } from "../../config";

import { useContext, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import { Context } from "../../context/Context";
import "./Settings.css";

const Settings = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("null");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  // const PF = "http://localhost:5000/images";

  const handleSubmit = async (event) => {
    dispatch({ type: "UPDATE_START" });
    event.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedUser.profilepicture = fileName;
      try {
        await axiosInstance.post("./upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const response = await axiosInstance.put(
        "/users/" + user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-title">
          <span className="settings-update-title">Update your account</span>
          <span className="settings-delete-title">Delete account</span>
        </div>
        <form className="settings-form" onSubmit={handleSubmit}>
          <label htmlFor="">Profile Picture</label>
          <div className="settings-pp">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilepicture}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settings-pp-icon fa-regular fa-circle-user"></i>
            </label>
          </div>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>

          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settings-submit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated
            </span>
          )}
        </form>
      </div>
      <SideBar />
    </div>
  );
};

export default Settings;
