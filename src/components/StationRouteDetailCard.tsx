import "css/StationRouteDetailCard.css";
import { Link } from "react-router-dom";

const StationRouteDetailCard = ({stationRouteInfo}: any) => {
    console.log("stationRouteInfo: ");
    console.log(stationRouteInfo);
    
    
    return <Link to={{pathname:"/bus-route-detail"}} state={{busRouteId: stationRouteInfo.busRouteId[0]}}>
                <div className="card-box">
                    <div className="routeInfo">
                        <div className="routeName">{stationRouteInfo.rtNm[0]}</div>
                        <div className="routeDireation">{stationRouteInfo.nxtStn[0]} 방향</div>
                    </div>
                    <div className="arrivalInfo">
                        <div>{stationRouteInfo.arrmsg1[0]}</div>
                        <div>{stationRouteInfo.arrmsg2[0]}</div>
                    </div>
                </div>
            </Link>

}

export default StationRouteDetailCard;