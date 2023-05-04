import "css/RouteStationDetailCard.css";
import { Link } from "react-router-dom";

interface Props {
    RouteStationInfo: any,
    highlightFlag: boolean
}

const RouteStationDetailCard = ({RouteStationInfo, highlightFlag }: Props) => {
    // console.log(RouteStationInfo);
    
    return <Link to={{pathname:"/station-detail"}} state={{stationUid: RouteStationInfo.arsId[0]}}>
        <div className={highlightFlag?"card-box highlight":"card-box"}>
            <div className="station-name">
                {RouteStationInfo.stationNm[0]}
            </div>
            <div className="station-infos">
                {RouteStationInfo.arsId[0]} | {RouteStationInfo.beginTm[0]}~{RouteStationInfo.lastTm[0]}
            </div>
        </div>
    </Link>
}

export default RouteStationDetailCard;