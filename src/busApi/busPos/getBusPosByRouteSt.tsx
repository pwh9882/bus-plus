import { parseXml } from "xmlParser";
export interface BusInfo {
  busType: string[];
  congetion: string[];
  dataTm: string[];
  isFullFlag: string[];
  lastStnId: string[];
  plainNo: string[];
  posX: string[];
  posY: string[];
  routeId: string[];
  sectDist: string[];
  sectOrd: string[];
  sectionId: string[];
  stopFlag: string[];
  tmX: string[];
  tmY: string[];
  vehId: string[];
}
export const getBusPosByRouteSt = async (busRouteId: string, startOrd: string, endOrd:string): Promise<Array<BusInfo> > => {
  
    const api =
    `api/rest/buspos/getBusPosByRouteSt?serviceKey=${process.env.REACT_APP_BUS_API_KEY}&busRouteId=${busRouteId}&startOrd=${startOrd}&endOrd=${endOrd}`;
    // console.log(api);
    
    const xmlRowText = await (await fetch(api, {})).text();
    // console.log(xmlRowText);
    let resultArray:any = (await parseXml(xmlRowText)).ServiceResult.msgBody[0]?.itemList;
    // console.log("resultArray", resultArray);
    
    return resultArray;
  };

