import { Link } from "react-router-dom";

const Navigation = ({ user }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/profile"}>{user.displayName}'s Profile</Link>
        </li>
        <li>
          <Link to={"/search"}>Search</Link>
        </li>
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

export default Navigation;
