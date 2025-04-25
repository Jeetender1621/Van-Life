import { Link, NavLink } from "react-router-dom";

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
      <nav>
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
      </nav>
    </header>
  );
}
