import "css/RouteStationDetailCard.css";
import { Link } from "react-router-dom";
import React, { Ref } from "react";

interface Props {
    routeStationInfo: any,
    highlightFlag: boolean
}

const RouteStationDetailCard = ({routeStationInfo, highlightFlag }: Props, ref: Ref<HTMLDivElement>) => {
    // console.log(RouteStationInfo);
    
    return <Link to={{pathname:"/station-detail"}} state={{stationUid: routeStationInfo.arsId[0], busRouteId: routeStationInfo.busRouteId[0]}}>
        <div className={highlightFlag?"station-card-box highlight":"station-card-box"} ref={ref}>
            <div className="station-card-dot">▼</div>
            <div className="station-card-infos">
                <div className="station-name">
                    {routeStationInfo.stationNm[0]}
                </div>
                <div className="station-infos">
                    {routeStationInfo.arsId[0]} | {routeStationInfo.beginTm[0]}~{routeStationInfo.lastTm[0]}
                </div>
            </div>
        </div>
    </Link>
}

export default React.forwardRef(RouteStationDetailCard);