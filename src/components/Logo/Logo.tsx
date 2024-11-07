import logo from "../../assets/tixflow-logo.png";
import "./Logo.scss";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div>
      <Link to="/" className="wrapper-black" aria-label="Go to Homepage">
        <img src={logo} className="wrapper-black__logo" alt="TixFlow Logo" />
      </Link>
    </div>
  );
}

export default Logo;
