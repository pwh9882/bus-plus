import { getRouteByStation } from "busApi/stationInfo/getRouteByStation";
import { getStationByName } from "busApi/stationInfo/getStationByNameList";
import { getStationByUid } from "busApi/stationInfo/getStationByUid";
import StationRouteDetailCard from "components/StationRouteDetailCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const StationDetail = () => {
  const location = useLocation();
  const uid = location.state.stationUid;
  const [fetchData, setFetchData] = useState<any | null>("");
  const [routeList, setRouteList] = useState<Array<string>>([]);

  const [stationInfo, setStationInfo]=useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getStationDetailData = async () => {
    
    console.log("UID: " + uid);
    
    let info = await getStationByUid(uid);
    // console.log(info);
    setLoading(false);
    if (info!==undefined){
      setStationInfo(info)
    } else {
      console.log("API초과");
    }
  };
  // console.log(stationInfo[0]);
  useEffect(() => {
    getStationDetailData();
    // 컴포넌트가 마운트될 때 실행되는 함수
    const timer = setInterval(() => {
      // 5초마다 실행되는 타이머
      // setLoading(true); // 로딩 상태를 true로 변경
      // getStationDetailData();
      console.log("Timer!");
      
    }, 5000); // 5000ms = 5초

    return () => {
      // 컴포넌트가 언마운트될 때 실행되는 함수
      clearInterval(timer); // 타이머 정리
      console.log("정리됨!");
    };
  }, []);
  
  return (
    <>
      <h4>{uid}</h4>
      
      {stationInfo.length === 0 ? <h1>StationDetail</h1> : <h2>{stationInfo[0]?.stNm[0]}</h2>}
      {loading ? <div>로딩중...</div> : <>
      <h3>{stationInfo[0]?.nxtStn[0]} 방면</h3>
      <div>
        {stationInfo.map((route)=>{
          return <StationRouteDetailCard key={route.busRouteAbrv[0]} stationRouteInfo={route}/>
        })}
      </div></>}
    </>
  );
};

export default StationDetail;
