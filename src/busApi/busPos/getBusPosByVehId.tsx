import { parseXml } from "xmlParser";

export const getBusPosByVehId = async (vehId: string): Promise<Array<any> > => {
  
    const api =
    `https://bus-plus-proxy.fly.dev/api/rest/buspos/getBusPosByVehId?serviceKey=${process.env.REACT_APP_BUS_API_KEY}&vehId=${vehId}`;
    const xmlRowText = await (await fetch(api, {})).text();
    // console.log(xmlRowText);
    let resultArray:any = (await parseXml(xmlRowText)).ServiceResult.msgBody[0]?.itemList;
    // console.log(resultArray);
    
    return resultArray;
  };

