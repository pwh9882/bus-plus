import { Link } from "react-router-dom";
import "css/bookmarkedStationCard.css"

interface Props{
    stationUid: string,
    stationName: string,
    stationNextStn: string,
}
const StationBookmarkCard = ({stationUid, stationName, stationNextStn}:Props) => {

    return <Link to={{pathname:"/station-detail"}} state={{stationUid: stationUid}}>
        <div className="stationBookmarkCard">
            <h2>{stationName}</h2>
          <h3>{stationNextStn} 방면</h3>
        </div>
    </Link>
}

export default StationBookmarkCard;