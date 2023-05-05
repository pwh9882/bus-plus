import { parseXml } from "xmlParser";

export const getBusPosByRtid = async (busRouteId: string): Promise<Array<any> > => {
  
    const api =
    `api/rest/buspos/getBusPosByRtid?serviceKey=${process.env.REACT_APP_BUS_API_KEY}&busRouteId=${busRouteId}`;
    const xmlRowText = await (await fetch(api, {})).text();
    // console.log(xmlRowText);
    let resultArray:any = (await parseXml(xmlRowText)).ServiceResult.msgBody[0]?.itemList;
    // console.log(resultArray);
    
    return resultArray;
  };
