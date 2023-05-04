const parseString = require('xml2js').parseString;

export const parseXml = (xml:string):any =>{
    return new Promise ( (resolve, reject) => {
        parseString (xml, (err:Error, result:any) => {
        if (err) {
          reject (err);
        } else {
          resolve (result);
        }
      });
    });
  }