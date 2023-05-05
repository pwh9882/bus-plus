import "css/StationRouteDetailCard.css";
import React, { Ref } from "react";
import { Link } from "react-router-dom";

const StationRouteDetailCard = ({stationRouteInfo, highlightFlag}: any, ref: Ref<HTMLDivElement>) => {
    // console.log("stationRouteInfo: ");
    // console.log(stationRouteInfo);
    
    
    return <Link to={{pathname:"/bus-route-detail"}} state={{busRouteId: stationRouteInfo.busRouteId[0], stationId: stationRouteInfo.arsId[0]}}>
                <div className={highlightFlag?"card-box highlight":"card-box"} ref={ref}>
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

export default React.forwardRef(StationRouteDetailCard);