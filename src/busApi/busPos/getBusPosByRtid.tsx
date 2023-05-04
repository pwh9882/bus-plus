import { parseXml } from "xmlParser";

export const getBusPosByRouteSt = async (busRouteId: string, endOrd:number): Promise<Array<any> > => {
  
    const api =
    `api/rest/buspos/getBusPosByRouteSt?serviceKey=${process.env.REACT_APP_BUS_API_KEY}&busRouteId=${busRouteId}&startOrd=1&endOrd=${endOrd}`;
    const xmlRowText = await (await fetch(api, {})).text();
    // console.log(xmlRowText);
    let resultArray:any = (await parseXml(xmlRowText)).ServiceResult.msgBody[0]?.itemList;
    // console.log(resultArray);
    
    return resultArray;
  };

