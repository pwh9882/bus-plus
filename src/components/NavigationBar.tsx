import { Link, useLocation } from "react-router-dom";
import "css/NavigationBar.css";
import {User} from "firebase/auth"

// 인터페이스를 사용하는 경우
interface Props {
  user: User|null;
}

const NavigationBar = ({ user } : Props) => {
  const location = useLocation();
  if (location.pathname === "/search") return <></>;
  return (
    <nav className="navigation-bar">
      <ul className="top-bar">
        <Link to={"/"}>Home</Link>
        <Link className="search-botton" to={"/search"}>
          <div>버스 또는 정류장 검색</div>
        </Link>
        <Link to={"/profile"}>Profile</Link>
      </ul>
      <ul></ul>
    </nav>
  );
};

export default NavigationBar;
