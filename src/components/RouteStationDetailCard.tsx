import "css/RouteStationDetailCard.css";
import { Link } from "react-router-dom";

const RouteStationDetailCard = ({RouteStationInfo}: any) => {
    // console.log(RouteStationInfo);
    
    return <>
        <Link to={{pathname:"/station-detail"}} state={{stationUid: RouteStationInfo.arsId[0]}}>
            <div className="card-box">
                <div>
                    <h3>{RouteStationInfo.stationNm[0]}</h3>
                </div>
                <div>
                    <h5>{RouteStationInfo.arsId[0]}</h5>
                    <div>{RouteStationInfo.beginTm[0]}~{RouteStationInfo.lastTm[0]}</div>
                </div>
            </div>
        </Link>
    </>
}

export default RouteStationDetailCard;