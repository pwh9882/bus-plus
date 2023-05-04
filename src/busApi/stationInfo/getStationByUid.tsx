import { parseXml } from "xmlParser";

export const getStationByUid = async (arsId: string): Promise<Array<any> > => {
  
    const api =
    `api/rest/stationinfo/getStationByUid?serviceKey=${process.env.REACT_APP_BUS_API_KEY}&arsId=${arsId}`;
    const xmlRowText = await (await fetch(api, {})).text();
    console.log(xmlRowText);
    let resultArray:any = (await parseXml(xmlRowText)).ServiceResult.msgBody[0]?.itemList;
    // console.log(resultArray);
    
    return resultArray;
  };

