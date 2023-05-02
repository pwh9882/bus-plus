import { useEffect } from "react";
import "css/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home">
      <div>
        <h1>Home</h1>
      </div>
      <Link to={"/station-detail?stationId=100100015"}>
        <div className="item station-dumy">
          <h2>국민대학교 앞</h2>
          <h3>롯데아파트 방면</h3>
        </div>
      </Link>
      <Link to={"/bus-route-detail"}>
        <div className="item bus-dummy">
          <h2>110B 국민대</h2>
        </div>
      </Link>
    </div>
  );
};

export default Home;
