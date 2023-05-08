import { BusInfo, getBusPosByRouteSt } from "busApi/busPos/getBusPosByRouteSt";
import { getBusPosByRtid } from "busApi/busPos/getBusPosByRtid";
import { getBusPosByVehId } from "busApi/busPos/getBusPosByVehId";
import { getStaionByRoute } from "busApi/busRouteInfo/getStationByRoute";
import { getStationByUid } from "busApi/stationInfo/getStationByUid";
import { getStationByUidwithRouteId } from "busApi/stationInfo/getStationByUidwithRouteId";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PlusEstimateArrivalTime = () => {
    const location = useLocation();
    const busRouteId = location.state.busRouteId;
    const stationList = location.state.stationList;
    const routeStationInfo = location.state.routeStationInfo;
    const startOrd = location.state.startStationIndex;
    const endOrd:string = stationList.indexOf(routeStationInfo);
    // console.log(busRouteId);
    // console.log(stationList)
    // console.log("startStationIndex", startOrd);
    // console.log("endOrd: ", endOrd);
    const routeName = stationList[0].busRouteNm[0];
    const startStationName = stationList[startOrd].stationNm[0];
    const endStationName = stationList[endOrd].stationNm[0];
    const [leftTime, setLeftTime] = useState("");
    let arrTimeInt = 0;
    let arrLeftSt = 0;

    const [userBus, setUserBus] = useState<BusInfo | null>();
    const getUserBus = async () => {
        const userBusList = await getBusPosByRouteSt(busRouteId, "0", startOrd);
        const userBus = userBusList[userBusList.length-1]
        // console.log("userBus: ", userBus);
        setUserBus(userBus)
    }
    
    const getBusPosInRoute = async () => {
        await getUserBus()
        const list= await getBusPosByRouteSt(busRouteId, startOrd, endOrd)
        // console.log("list", list);
        const endStationUid = stationList[endOrd].arsId[0]
        const endStationInfo = await getStationByUid(endStationUid)
        // console.log("info:");
        // console.log(endStationInfo);
        
        if(list === undefined){
            // endPos의 1번째 도착 예정시각
            endStationInfo.forEach((route)=>{
                if(route.busRouteId[0] === busRouteId){
                    console.log(route.busRouteAbrv[0] + " " + route.arrmsgSec1[0]);
                    arrTimeInt = parseArrmsg(route.arrmsgSec1[0])
                    arrLeftSt = 1;
                    // setLeftTime(route.arrmsgSec1[0])
                }
            })
            
        } else if(list.length === 1) {
            // endPos의 2번째 도착 예정시각
            endStationInfo.forEach((route)=>{
                if(route.busRouteId[0] === busRouteId){
                    console.log(route.busRouteAbrv[0] + " " + route.arrmsgSec2[0]);
                    arrTimeInt = parseArrmsg(route.arrmsgSec2[0])
                    arrLeftSt = 2;
                    // setLeftTime(route.arrmsgSec2[0])
                }
            })
        } else {
            // setLeftTime("3번째 이상!")
            console.log("3이상");
            
            await refreshLeftTime();
        }
        // console.log("arrTimeInt", arrTimeInt);
        
    }
    

    const refreshLeftTime = async () => {
        // userBus를 가지고 endOrd 정거장까지 거리 찾기
        // userBus는 무조건 startOrd 직전버스
        let sumTime = "";
        let sumSec = 0;
        // console.log("userBus",userBus);
        let currStartBus = userBus;
        if(userBus){
            currStartBus = (await getBusPosByVehId(userBus!.vehId[0]))[0];
        } else {
            const userBusList = await getBusPosByRouteSt(busRouteId, "0", startOrd);
            const userBus = userBusList[userBusList.length-1]
            currStartBus = userBus;
        }
        // console.log("currStartBus", currStartBus);
        
        let currOrd = parseInt(endOrd);
        let busPosList = await getBusPosByRouteSt(busRouteId, (parseInt(currStartBus!.sectOrd[0])+1).toString(), currOrd.toString());
        let busPosIndex = busPosList.length-1;
        let currOrdStation = await getStationByUidwithRouteId(stationList[currOrd].arsId[0], busRouteId)

        for(let i=0; i<busPosList.length-1; i++){
            busPosIndex--;
            let curr2thBus = busPosList[busPosIndex]
            let curr2thTime = currOrdStation?.arrmsgSec2[0]

            // sumTime += curr2thTime;
            sumSec += parseArrmsg(curr2thTime!);
            currOrd = parseInt(curr2thBus.sectOrd[0])+1;

            // let curr1thBus = curr2thBus;
            currOrdStation = await getStationByUidwithRouteId(stationList[currOrd].arsId[0], busRouteId)
            let curr1thTime = currOrdStation?.arrmsgSec1[0];
            // sumTime += `-${curr1thTime}`
            sumSec += parseArrmsg(curr1thTime!);
        }
        let curr2thTime = currOrdStation?.arrmsgSec2[0];
        // sumTime += curr2thTime;
        sumSec += parseArrmsg(curr2thTime!);
        // console.log("busPosList",busPosList);
        
        if(!busPosList){
            // sumTime = currOrdStation?.arrmsgSec1[0]!;
            sumSec = parseArrmsg(currOrdStation?.arrmsgSec1[0]!);
        }

        // console.log("sumTime", sumTime);
        // console.log("sumSec: ", sumSec);
        arrTimeInt = sumSec;
        arrLeftSt = busPosList.length+1
    }

    const setArrTimer = () => {
        let temp = "";
        if(arrTimeInt > 0) arrTimeInt--;
            if(arrTimeInt===-1){
                temp = "추정 실패...";
                // console.log(arrTimeInput[i]);
            } else {
                let hour = Math.trunc(arrTimeInt/3600);
                let min = Math.trunc((arrTimeInt%3600)/60)
                let sec = (arrTimeInt%60)
                if(hour) temp += `${hour}시간 `;
                if(min) temp += `${min}분 `;
                temp += `${sec}초 후 도착 [${arrLeftSt}번째 전]`
            }
        setLeftTime(temp);
    }

    useEffect(()=>{
        getBusPosInRoute()
        // refreshLeftTime()
        const timer = setInterval(() => {
            setArrTimer();
            // console.log("Timer!");
            // refreshLeftTime();
          }, 10000); // 5000ms = 5초
      
          return () => {
            // 컴포넌트가 언마운트될 때 실행되는 함수
            clearInterval(timer); // 타이머 정리
            // console.log("sec정리됨!");
          };
    },[])
    return <>
        <h1>{routeName}</h1>
        <h2>{startStationName}</h2>
        <h2>↓</h2>
        <h2>{endStationName}</h2>
        <h2>{userBus?.plainNo[0]}</h2>
        <h1>
            {leftTime}
        </h1>
    </>
}

export default PlusEstimateArrivalTime;


const parseArrmsg = (arrTimeInput: string) => {
    let input = arrTimeInput;
    let arrTime = -1;
    let arrLeft = "";
    if(input === "출발대기" || input === "[차고지출발] " || input === "곧 도착" || input === "운행종료"){
        // console.log(input);
    } else {
        // pattern을 이용해서 시간 정보를 가져오는 부분
        let match: RegExpMatchArray | null = input.match(/(?:(\d+)시간)?(?:(\d+)분)?(?:(\d+)초)?/);
        if (match) {
            // 시간 정보가 있는 경우
            arrTime = 0;
            arrTime += match[1] ? 3600*parseInt(match[1]) : 0;
            arrTime += match[2] ? 60*parseInt(match[2]) : 0;
            arrTime += match[3] ? parseInt(match[3]) : 0;
            arrLeft = input.substring(input.indexOf("후")+1);
        }
        else {
            // 시간 정보가 없는 경우
            // console.log(`${input} -> 시간 정보 없음`);
        }
    }    
    return arrTime
    // let resultString = "";
    // // let input = arrTimeInput[i];
    // if(arrTime===-1){
    //     resultString = arrTimeInput;
    //     // console.log(arrTimeInput[i]);
    // } else {
    //     let hour = Math.trunc(arrTime/3600);
    //     let min = Math.trunc((arrTime%3600)/60)
    //     let sec = (arrTime%60)
    //     if(hour) resultString += `${hour}시간 `;
    //     if(min) resultString += `${min}분 `;
    //     resultString += `${sec}초 ${arrLeft}`
    // }
    // return resultString
}