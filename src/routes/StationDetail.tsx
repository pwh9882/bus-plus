import { useEffect, useState } from "react";

const StationDetail = () => {
  const [fetchData, setFetchData] = useState("");
  const getTestData = async () => {
    const statationId = window.location.search.substring("?stationId=".length);
    const api =
      "api/rest/busRouteInfo/getStaionByRoute?serviceKey=VfsUSWplKI4NRjZFj4d7Wf2rJY%2Fsa8EKBpl5F0hb7SGbIO02281GshKIE2rb15YwPegKM6Sm4ZbuwNibtknq9A%3D%3D&busRouteId=";
    const xmlRowText = await (await fetch(`${api}${statationId}`, {})).text();
    // console.log(`${api}${statationId}`);
    const domParser = new DOMParser();
    let doc = domParser.parseFromString(xmlRowText, "text/xml");
    console.log(doc);
    // let inputText = await json;
    // setFetchData(inputText);
  };

  useEffect(() => {
    getTestData();
  }, []);
  return (
    <>
      <h1>StationDetail</h1>
      <h2>국민대학교 앞</h2>
      <h3>롯데 아파트 방면</h3>
      <div>{fetchData}</div>
    </>
  );
};

export default StationDetail;
