import { useEffect } from "react";

const Home = () => {
  const getTestData = async () => {
    // const statationId = "100100015";
    // const api =
    //   "http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute?serviceKey=VfsUSWplKI4NRjZFj4d7Wf2rJY%2Fsa8EKBpl5F0hb7SGbIO02281GshKIE2rb15YwPegKM6Sm4ZbuwNibtknq9A%3D%3D&busRouteId=";
    // const json = await await fetch(
    //   `https://api.allorigins.win/raw?url=${api}${statationId}`,
    //   {
    //     // mode: "cors",
    //   }
    // );
    // console.log(`https://api.allorigins.win/raw?url=${api}${statationId}`);
    // console.log(await json.text());
  };

  useEffect(() => {
    getTestData();
  }, []);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
