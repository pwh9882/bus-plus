import { getRouteByStation } from "busApi/stationInfo/getRouteByStation";
import { getStationByName } from "busApi/stationInfo/getStationByNameList";
import { getStationByUid } from "busApi/stationInfo/getStationByUid";
import StationRouteDetailCard from "components/StationRouteDetailCard";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const StationDetail = () => {
  const location = useLocation();
  const uid = location.state.stationUid;
  const busRouteId = location.state.busRouteId;

  const routeRef = useRef<HTMLDivElement>(null);

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
  useEffect(()=>{
    if(routeRef.current){
      // stationRef.current.scrollIntoView({ behavior: "auto" });
      // stationRef.current.scrollIntoView({ behavior: "auto", block: "center" });

      // stationRef.current의 상단 위치를 구함
      const elementTop = routeRef.current.getBoundingClientRect().top + window.pageYOffset;
      // window의 높이를 구함
      const windowHeight = window.innerHeight;
      // element가 중앙보다 살짝 위인 3분의 2지점으로 스크롤하려면, elementTop에서 windowHeight의 1/6을 빼줌
      const offset = elementTop - windowHeight / 6;
      // window.scrollTo 메서드로 스크롤
      window.scrollTo({ top: offset, behavior: "smooth" });

    }
  },[stationInfo])
  
  return (
    <>
      <h1>StationDetail</h1>
      <h4>{uid}</h4>
      
      {stationInfo.length === 0 ? <h1>StationDetail</h1> : <h2>{stationInfo[0]?.stNm[0]}</h2>}
      {loading ? <div>로딩중...</div> : <>
      <h3>{stationInfo[0]?.nxtStn[0]} 방면</h3>
      <div>
        {stationInfo.map((route)=>{
          const isOrigin = route.busRouteId[0] === busRouteId;
          
          
          return <StationRouteDetailCard
           key={route.busRouteAbrv[0]} 
           highlightFlag={isOrigin} 
           ref={isOrigin ? routeRef : null} 
           stationRouteInfo={route}/>
        })}
      </div></>}
    </>
  );
};

export default StationDetail;
