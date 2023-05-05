import "css/StationRouteDetailCard.css";
import React, { Ref, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StationRouteDetailCard = ({stationRouteInfo, highlightFlag}: any, ref: Ref<HTMLDivElement>) => {
    // console.log("stationRouteInfo: ");
    // console.log(stationRouteInfo);
    const [arrTimeInfos, setArrTimeInfos] = useState(["",""]);
    let arrTimeInput = [stationRouteInfo.arrmsg1[0], stationRouteInfo.arrmsg2[0]]
    let arrTime = [-1, -1];
    let arrLeft = ["", ""];
    const init = () => {
        for(let i=0; i<2; i++){
            let input = arrTimeInput[i];
            if(input === "출발대기" || input === "[차고지출발] " || input === "곧 도착" || input === "운행종료"){
                // console.log(input);
            } else {
                // pattern을 이용해서 시간 정보를 가져오는 부분
                let match: RegExpMatchArray | null = input.match(/(?:(\d+)시간)?(?:(\d+)분)?(?:(\d+)초)?/);
                if (match) {
                    // 시간 정보가 있는 경우
                    arrTime[i] = 0;
                    arrTime[i] += match[1] ? 3600*parseInt(match[1]) : 0;
                    arrTime[i] += match[2] ? 60*parseInt(match[2]) : 0;
                    arrTime[i] += match[3] ? parseInt(match[3]) : 0;
                    arrLeft[i] = input.substring(input.indexOf("후")+1);
                }
                else {
                    // 시간 정보가 없는 경우
                    // console.log(`${input} -> 시간 정보 없음`);
                }
            }
        }
        let temp = ["",""];
        for(let i=0; i<2; i++){
            // let input = arrTimeInput[i];
            if(arrTime[i]===-1){
                temp[i] = arrTimeInput[i];
                // console.log(arrTimeInput[i]);
            } else {
                let hour = Math.trunc(arrTime[i]/3600);
                let min = Math.trunc((arrTime[i]%3600)/60)
                let sec = (arrTime[i]%60)
                if(hour) temp[i] += `${hour}시간 `;
                if(min) temp[i] += `${min}분 `;
                temp[i] += `${sec}초 ${arrLeft[i]}`
            }
        } 
        setArrTimeInfos(temp);
        // return temp;
    }
    const setArrTimer = () => {
        let temp = ["",""];
        for(let i=0; i<2; i++){
            // let input = arrTimeInput[i];
            if(arrTime[i] > 0) arrTime[i]--;
            if(arrTime[i]===-1){
                temp[i] = arrTimeInput[i];
                // console.log(arrTimeInput[i]);
            } else {
                let hour = Math.trunc(arrTime[i]/3600);
                let min = Math.trunc((arrTime[i]%3600)/60)
                let sec = (arrTime[i]%60)
                if(hour) temp[i] += `${hour}시간 `;
                if(min) temp[i] += `${min}분 `;
                temp[i] += `${sec}초 ${arrLeft[i]}`
                // temp[i] = `${ hour}시간 ${ min }분 ${ sec }초, ${arrLeft[i]}`
                // console.log(`${input} -> ${temp[i]}`)
            }
        } 
        setArrTimeInfos(temp);
    }
    useEffect(()=>{
        // console.log("init");
        
        init();
        // setInterval(setArrTimer, 1000);

        const timer = setInterval(() => {
            // 5초마다 실행되는 타이머
            // setLoading(true); // 로딩 상태를 true로 변경
            setArrTimer();
            // console.log("Timer!");
            
          }, 1000); // 5000ms = 5초
      
          return () => {
            // 컴포넌트가 언마운트될 때 실행되는 함수
            clearInterval(timer); // 타이머 정리
            // console.log("sec정리됨!");
          };
    },[stationRouteInfo])

    
    // arrivalInfoParser(stationRouteInfo.arrmsg1[0])
    // arrivalInfoParser(stationRouteInfo.arrmsg2[0])

    
    return <Link to={{pathname:"/bus-route-detail"}} state={{busRouteId: stationRouteInfo.busRouteId[0], stationId: stationRouteInfo.arsId[0]}}>
                <div className={highlightFlag?"card-box highlight":"card-box"} ref={ref}>
                    <div className="routeInfo">
                        <div className="routeName">{stationRouteInfo.rtNm[0]}</div>
                        <div className="routeDireation">{stationRouteInfo.nxtStn[0]} 방향</div>
                    </div>
                    <div className="arrivalInfo">
                        <div>{arrTimeInfos[0]}</div>
                        <div>{arrTimeInfos[1]}</div>
                    </div>
                </div>
            </Link>

}

export default React.forwardRef(StationRouteDetailCard);