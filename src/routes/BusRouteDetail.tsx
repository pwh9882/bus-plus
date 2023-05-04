import { getStaionByRoute } from "busApi/busRouteInfo/getStationByRoute";
import RouteStationDetailCard from "components/RouteStationDetailCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BusRouteDetail = () => {
  const location = useLocation();
  const [fetchData, setFetchData] = useState<any | null>("");
  const [stationList, setStationList] = useState<Array<any>>([]);
  const getBusRouteList = async () => {
    const busRouteId = location.state.busRouteId;

    const data = await getStaionByRoute(busRouteId);
    console.log(data);
    setStationList(data);
  };

  useEffect(() => {
    getBusRouteList();

    // 컴포넌트가 마운트될 때 실행되는 함수
    const timer = setInterval(() => {
      // 5초마다 실행되는 타이머
      // setLoading(true); // 로딩 상태를 true로 변경
      // getStationDetailData();
      console.log("timer!");
      
    }, 5000); // 5000ms = 5초

    return () => {
      // 컴포넌트가 언마운트될 때 실행되는 함수
      clearInterval(timer); // 타이머 정리
      console.log("timer정리됨!");
    };
  }, []);
  return (
    <>
      <h1>BusRouteDetail</h1>
      <h2>110B 국민대</h2>
      <div>{
        stationList.map((station) => {
          const key = station.arsId[0];
          return <RouteStationDetailCard key={key} RouteStationInfo={station}/>;
        })}
      </div>
    </>
  );
};

export default BusRouteDetail;
