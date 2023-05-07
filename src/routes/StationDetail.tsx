import { getStationByUid } from "busApi/stationInfo/getStationByUid";
import StationRouteDetailCard from "components/StationRouteDetailCard";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "css/StationDetail.css";
import { User } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { dbService } from "FirebaseApp";
interface Props{
  user:User|null;
}

const StationDetail = ({user}:Props) => {
  const location = useLocation();
  const stationUid = location.state.stationUid;
  const busRouteId = location.state.busRouteId;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const routeRef = useRef<HTMLDivElement>(null);

  const [stationInfo, setStationInfo]=useState<Array<any>>([]);
  const getStationDetailData = async () => {
    let info = await getStationByUid(stationUid);
    if (info!==undefined){
      setStationInfo(info)
    } else {
      console.log("API초과");
    }
  };
  // console.log(stationInfo[0]);
  useEffect(() => {
    getIsBookmarked();
    getStationDetailData();
    // 컴포넌트가 마운트될 때 실행되는 함수
    const timer = setInterval(() => {
      // 5초마다 실행되는 타이머
      // setLoading(true); // 로딩 상태를 true로 변경
      getStationDetailData();
      console.log("Timer!");
      
    }, 10000); // 5000ms = 5초

    return () => {
      // 컴포넌트가 언마운트될 때 실행되는 함수
      clearInterval(timer); // 타이머 정리
      console.log("정리됨!");
    };
  }, []);
  useEffect(()=>{
    if(routeRef.current){
      // stationRef.current.scrollIntoView({ behavior: "auto" });
      // stationRef.current.scrollIntoView({ behavior: "auto", block: "center" });

      // stationRef.current의 상단 위치를 구함
      const elementTop = routeRef.current.getBoundingClientRect().top + window.pageYOffset;
      // window의 높이를 구함
      const windowHeight = window.innerHeight;
      // element가 중앙보다 살짝 위인 3분의 2지점으로 스크롤하려면, elementTop에서 windowHeight의 1/6을 빼줌
      const offset = elementTop - windowHeight / 6;
      // window.scrollTo 메서드로 스크롤
      window.scrollTo({ top: offset, behavior: "smooth" });

    }
  },[stationInfo])

  const isBookMarkedQuery = query(
    collection(dbService, "stationBookmarks"),
    where("bookmarkerId", "==", user?.uid),
    where("bookmarkedStationUid", "==", stationUid)
  );
  const getIsBookmarked = async () => {
    // const IsBookmarkedSnapshoot = await getDocs(isBookMarkedQuery);
    onSnapshot(isBookMarkedQuery, (snapshot)=>{
      // console.log("getIsBookmarked");
      if(!snapshot.empty){
        setIsBookmarked(true);
      }
    })
  }
  const onBookmarkBtnClick = async () => {
    const querySnapshot = await getDocs(isBookMarkedQuery);
    if (!querySnapshot.empty) {
      try {
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
        console.log("Bookmark deleted successfully");
      } catch (error) {
        console.error("Error deleting bookmark: ", error);
      }
      setIsBookmarked(false);
    } else {
      const newStationBookmark = {
        bookmarkedAt: Date.now(),
        bookmarkerId: user?.uid,
        bookmarkedStationUid: stationUid,
        bookmarkedStationName: stationInfo[0]?.stNm[0],
        bookmarkedStationNextSt: stationInfo[0]?.nxtStn[0]
      }
      try {
        const docRef = await addDoc(collection(dbService, "stationBookmarks"), newStationBookmark);
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      setIsBookmarked(true);
    }
  }
  
  return (
    <>
      <div className="stationDetailHeader">
        <h1>StationDetail</h1>
        <h3>{stationUid}</h3>
        <h2>{stationInfo[0]?.stNm[0]}</h2>
        <h3>{stationInfo[0]?.nxtStn[0]} 방면</h3>
        <div className="bookmarkBtn" onClick={onBookmarkBtnClick}>{isBookmarked?"★":"☆"}</div>
      </div>
      <div className="routeList">
        {stationInfo.map((route)=>{
          const isOrigin = route.busRouteId[0] === busRouteId;
          // console.log(route);
          
          return <StationRouteDetailCard
           key={route.busRouteAbrv[0]} 
           highlightFlag={isOrigin} 
           ref={isOrigin ? routeRef : null} 
           stationRouteInfo={route}/>
        })}
      </div>
    </>
  );
};

export default StationDetail;
