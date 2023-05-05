import { Link } from "react-router-dom";
import "css/bookmarkedStationCard.css"

interface Props{
    busRouteId: string,
    routeName: string,
}
const RouteBookmarkCard = ({busRouteId, routeName}:Props) => {

    return <Link to={{pathname:"/bus-route-detail"}} state={{busRouteId: busRouteId}}>
        <div className="stationBookmarkCard">
            <h2>{routeName}</h2>
        </div>
    </Link>
}

export default RouteBookmarkCard;