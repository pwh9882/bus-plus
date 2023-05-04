import "css/StationRouteDetailCard.css";

const StationRouteDetailCard = ({stationRouteInfo}: any) => {
    console.log(stationRouteInfo);
    
    return <>
        <div className="card-box">
            <div>
                <div>{stationRouteInfo.rtNm[0]}</div>
                <div>{stationRouteInfo.nxtStn[0]} 방향</div>
            </div>
            <div>
                <div>{stationRouteInfo.arrmsg1[0]}</div>
                <div>{stationRouteInfo.arrmsg2[0]}</div>
            </div>
        </div>
    </>
}

export default StationRouteDetailCard;