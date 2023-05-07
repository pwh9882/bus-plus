import { parseXml } from "xmlParser";
export interface StationRouteStatus {
  adirection: string[];
  arrmsg1: string[];
  arrmsg2: string[];
  arrmsgSec1: string[];
  arrmsgSec2: string[];
  arsId: string[];
  busRouteAbrv: string[];
  busRouteId: string[];
  busType1: string[];
  busType2: string[];
  congestion: string[];
  deTourAt: string[];
  firstTm: string[];
  gpsX: string[];
  gpsY: string[];
  isArrive1: string[];
  isArrive2: string[];
  isFullFlag1: string[];
  isFullFlag2: string[];
  isLast1: string[];
  isLast2: string[];
  lastTm: string[];
  nextBus: string[];
  nxtStn: string[];
  posX: string[];
  posY: string[];
  repTm1: string[];
  rerdieDiv1: string[];
  rerdieDiv2: string[];
  rerideNum1: string[];
  rerideNum2: string[];
  routeType: string[];
  rtNm: string[];
  sectNm: string[];
  sectOrd1: string[];
  sectOrd2: string[];
  stId: string[];
  stNm: string[];
  staOrd: string[];
  stationNm1: string[];
  stationNm2: string[];
  stationTp: string[];
  term: string[];
  traSpd1: string[];
  traSpd2: string[];
  traTime1: string[];
  traTime2: string[];
  vehId1: string[];
  vehId2: string[]
}
export const getStationByUid = async (arsId: string): Promise<Array<StationRouteStatus> > => {
  
    const api =
    `https://bus-plus-proxy.fly.dev/api/rest/stationinfo/getStationByUid?serviceKey=${process.env.REACT_APP_BUS_API_KEY}&arsId=${arsId}`;
    const xmlRowText = await (await fetch(api, {})).text();
    // console.log(xmlRowText);
    let resultArray = (await parseXml(xmlRowText)).ServiceResult.msgBody[0]?.itemList;
    
    // console.log("resultArray",resultArray);
    
    return resultArray;
  };

  
