import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-titles">
        <span className="header-title-sm">React & Node</span>
        <span className="header-title-lg">Blog</span>
      </div>
      <img
        className="header-img"
        src="https://images.pexels.com/photos/162461/dog-laika-lyngen-back-pack-162461.jpeg?cs=srgb&dl=pexels-pixabay-162461.jpg&fm=jpg"
        alt=""
      />
    </div>
  );
};

export default Header;
