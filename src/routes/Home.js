import { useEffect } from "react";
import "css/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const getTestData = async () => {
    const statationId = "100100015";
    const api =
      "api/rest/busRouteInfo/getStaionByRoute?serviceKey=VfsUSWplKI4NRjZFj4d7Wf2rJY%2Fsa8EKBpl5F0hb7SGbIO02281GshKIE2rb15YwPegKM6Sm4ZbuwNibtknq9A%3D%3D&busRouteId=";
    const json = await await fetch(`${api}${statationId}`, {
      // mode: "cors",
    });
    console.log(`${api}${statationId}`);
    console.log(await json.text());
  };

  useEffect(() => {
    getTestData();
  }, []);
  return (
    <div className="Home">
      <div>
        <h1>Home</h1>
      </div>
      <Link to={"/station-detail"}>
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
