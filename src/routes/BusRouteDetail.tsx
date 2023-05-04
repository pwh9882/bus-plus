import { getBusPosByRouteSt } from "busApi/busPos/getBusPosByRtid";
import { getRouteInfoItem } from "busApi/busRouteInfo/getRouteInfoItem";
import { getStaionByRoute } from "busApi/busRouteInfo/getStationByRoute";
import RouteStationDetailCard from "components/RouteStationDetailCard";
import { routeSatationListsDummy } from "dummyDatas/routeSatationListsDummy";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "css/BusRouteDetail.css";

const BusRouteDetail = () => {
  const location = useLocation();
  const busRouteId = location.state.busRouteId;
  const [fetchData, setFetchData] = useState<any | null>("");
  const [stationList, setStationList] = useState<Array<any>>([]);
  const getBusRouteList = async () => {
    console.log(busRouteId);
    
    const routeStationList = await getStaionByRoute(busRouteId);
    // const routeStationList = routeSatationListsDummy;
    // console.log(routeStationList);
    
    const busPosRouteList = await getBusPosByRouteSt(busRouteId, routeStationList.length);
    // console.log(busPosRouteList);
    
    setStationList(routeStationList);
  };

  useEffect(() => {
    // console.log(getRouteInfoItem(busRouteId));
    
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
      <h2>{stationList[0]?.busRouteNm[0]}</h2>
      <div className="busRouteInfo">
        <div className="busRouteInfo-busPosList">{
          stationList.map((station)=>{
            
            return <div key={station.arsId[0]} style={{height:"74px"}}>a</div>;
          })
        }
        </div>
        <div className="busRouteInfo-RouteList">{
          stationList.map((station) => {
            const key = station.arsId[0];
            return <RouteStationDetailCard key={key} RouteStationInfo={station}/>;
          })}
        </div>
        
      </div>
    </>
  );
};

export default BusRouteDetail;
