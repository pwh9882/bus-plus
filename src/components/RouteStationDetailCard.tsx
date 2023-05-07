import "css/RouteStationDetailCard.css";
import { Link, useNavigate } from "react-router-dom";
import React, { Ref } from "react";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { IconButton } from "@mui/material";
interface Props {
    routeStationInfo: any,
    highlightFlag: boolean,
    isAfterStartStation: boolean
    startStationId: any
    busRouteId: string
    stationList: Array<any>
    startStationIndex: number
}

const RouteStationDetailCard = ({
    routeStationInfo, highlightFlag, isAfterStartStation, startStationId, busRouteId, stationList,startStationIndex
}: Props, ref: Ref<HTMLDivElement>) => {
    // console.log(RouteStationInfo);
    const navigate = useNavigate();
    
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
            {isAfterStartStation&& 
            <IconButton onClick={(event:any)=>{
                event.preventDefault();
                navigate("/plus-estimate-arrival-time", {
                    state:{
                        busRouteId: busRouteId, 
                        startStationId: startStationId, 
                        endStationId: routeStationInfo.arsId[0],
                        stationList: stationList,
                        routeStationInfo: routeStationInfo,
                        startStationIndex: startStationIndex
                    }})
            }} aria-label="delete" size="small">
                <TimerOutlinedIcon fontSize="small" />
            </IconButton>}
        </div>
    </Link>
}

export default React.forwardRef(RouteStationDetailCard);