
import { StationRouteStatus, getStationByUid } from "./getStationByUid";

export const getStationByUidwithRouteId = async (arsId: string, busRouteId: string): Promise<StationRouteStatus|null> => {
  
    const resultArray = await getStationByUid(arsId);
    let retVal =null;
    resultArray.forEach(route=>{
      if(route!.busRouteId[0] === busRouteId)
      {
        // console.log("route", route);
        retVal = route;
      }
    })
    return retVal;
  };

