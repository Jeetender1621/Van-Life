import { Link, NavLink } from "react-router-dom";
import imageUrl from "/assets/images/avatar-icon.png";

export default function Header() {
  const navLinkStyling = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <header>
      <Link className="site-logo" to="/">
        #VANLIFE
      </Link>
      <nav className="header-nav">
        <NavLink
          to="host"
          style={({ isActive }) => (isActive ? navLinkStyling : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="about"
          style={({ isActive }) => (isActive ? navLinkStyling : null)}
        >
          About
        </NavLink>
        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? navLinkStyling : null)}
        >
          Vans
        </NavLink>
        <NavLink to="login" className="login-link">
          <img src={imageUrl} className="login-icon" />
        </NavLink>
      </nav>
    </header>
  );
}
