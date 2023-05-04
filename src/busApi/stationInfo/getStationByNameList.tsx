

export const getStationByName = async (stationName: string): Promise<any> => {
    
    const api =
    `api/rest/stationinfo/getStationByName?serviceKey=${process.env.REACT_APP_BUS_API_KEY}&stSrch=`;
    const xmlRowText = await (await fetch(`${api}${stationName}`, {})).text();
    const domParser = new DOMParser();
    let doc = domParser.parseFromString(xmlRowText, "text/xml");
    let itemList =  doc.getElementsByTagName("itemList");
    console.log(doc);
    console.log(itemList.item(0)?.querySelector("stNm")?.innerHTML);
    const stationItem = itemList.item(0)!;
    
    return stationItem;
  };

