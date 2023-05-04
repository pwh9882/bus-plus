export const getRouteByStation = async (stationId: string): Promise<string> => {
    
    const api =
    `api/rest/stationinfo/getRouteByStation?serviceKey=${process.env.REACT_APP_BUS_API_KEY}&stId=`;
    const xmlRowText = await (await fetch(`${api}${stationId}`, {})).text();
    // console.log(`${api}${statationId}`);
    const domParser = new DOMParser();
    let doc = domParser.parseFromString(xmlRowText, "text/xml");
    let itemList =  doc.getElementsByTagName("itemList");
    console.log(doc);
    
    let routes : Array<string> = [];
    for(let i=0; i<itemList.length; i++){
      // console.log(list.item(i)?.querySelector("stationNm")?.innerHTML);
      routes.push(itemList.item(i)?.querySelector("rtNm")?.innerHTML!)
    }
    return ""
  };

