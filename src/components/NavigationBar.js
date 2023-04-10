import { Link, useLocation } from "react-router-dom";
import "css/NavigationBar.css";

const NavigationBar = ({ user }) => {
  const location = useLocation();
  if (location.pathname === "/search") return;
  return (
    <nav className="navigation-bar">
      <ul className="top-bar">
        <Link to={"/"}>Home</Link>
        <Link className="search-botton" to={"/search"}>
          <div>버스 또는 정류장 검색</div>
        </Link>
        <Link to={"/profile"}>{user.displayName}'s Profile</Link>
      </ul>
      <ul>
        <li>
          <Link to={"/bus-route-detail"}>Bus Route Detail</Link>
        </li>
        <li>
          <Link to={"/station-detail"}>Station Detail</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
