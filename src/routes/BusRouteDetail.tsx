import { getBusPosByRouteSt } from "busApi/busPos/getBusPosByRtid";
import { getRouteInfoItem } from "busApi/busRouteInfo/getRouteInfoItem";
import { getStaionByRoute } from "busApi/busRouteInfo/getStationByRoute";
import RouteStationDetailCard from "components/RouteStationDetailCard";
import { routeSatationListsDummy } from "dummyDatas/routeSatationListsDummy";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "css/BusRouteDetail.css";

type StationRef = HTMLDivElement;


const BusRouteDetail = () => {
  const location = useLocation();
  const busRouteId = location.state.busRouteId;
  const stationId = location.state.stationId;
  console.log("stationId: "+ stationId);

  const stationRef = useRef<StationRef>(null);
    
  const [stationList, setStationList] = useState<Array<any>>([]);
  const getBusRouteList = async () => {
    console.log("busRouteId: "+ busRouteId);
    
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
  useEffect(()=>{
    if(stationRef.current){
      // stationRef.current.scrollIntoView({ behavior: "auto" });
      // stationRef.current.scrollIntoView({ behavior: "auto", block: "center" });

      // stationRef.current의 상단 위치를 구함
      const elementTop = stationRef.current.getBoundingClientRect().top + window.pageYOffset;
      // window의 높이를 구함
      const windowHeight = window.innerHeight;
      // element가 중앙보다 살짝 위인 3분의 2지점으로 스크롤하려면, elementTop에서 windowHeight의 1/6을 빼줌
      const offset = elementTop - windowHeight / 6;
      // window.scrollTo 메서드로 스크롤
      window.scrollTo({ top: offset, behavior: "smooth" });

    }
  }, [stationList])  
    
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
            if(key===stationId){
              console.log(station);
              // return <RouteStationDetailCard key={key} RouteStationInfo={station}/>;
            } 
            return <RouteStationDetailCard 
            key={key} 
            highlightFlag={key===stationId} 
            routeStationInfo={station}
            ref={key===stationId ? stationRef : null} 
              />
          })}
        </div>
        
      </div>
    </>
  );
};

export default BusRouteDetail;
