import { useEffect, useState } from "react";
import "css/Home.css";
import { Link } from "react-router-dom";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { User } from "firebase/auth";
import { dbService } from "FirebaseApp";
import StationBookmarkCard from "components/StationBookmarkCard";
import RouteBookmarkCard from "components/RouteBookmarkCard";
interface Props{
  user:User|null
}
const Home = ({user}:Props) => {
  const [userStationBookmarkedList, setUserStationBookmarkedList] = useState<Array<DocumentData>>([]);
  const [userRouteBookmarkedList, setUserRouteBookmarkedList] = useState<Array<DocumentData>>([]);
  const bookMarkedStationsQuery = query(
    collection(dbService, "stationBookmarks"),
    where("bookmarkerId", "==", user?.uid),
  );
  const bookMarkedRoutesQuery = query(
    collection(dbService, "routeBookmarks"),
    where("bookmarkerId", "==", user?.uid),
  );
  const getUserBookmarkedList = async () =>{
    let querySnapshot = await getDocs(bookMarkedStationsQuery);
    if(!querySnapshot.empty){
      querySnapshot.docs.forEach(doc => {
        // console.log(doc.data());
        setUserStationBookmarkedList((currList)=>[...currList, doc.data()])
      })
    }
    querySnapshot = await getDocs(bookMarkedRoutesQuery);
    if(!querySnapshot.empty){
      querySnapshot.docs.forEach(doc => {
        // console.log(doc.data());
        setUserRouteBookmarkedList((currList)=>[...currList, doc.data()])
      })
    }
  }
  useEffect(()=>{
    getUserBookmarkedList();

  }, [])


  return (
    <div className="Home">
      <div>
        <h1>Home</h1>
      </div>
      {/* <Link to={{pathname:"/station-detail"}} state={{stationUid: "08110"}}>
        <div className="item station-dumy">
          <h2>국민대학교 앞</h2>
          <h3>롯데아파트 방면</h3>
        </div>
      </Link> 
      <Link to={"/bus-route-detail"} state={{busRouteId:"100100015"}}>
        <div className="item bus-dummy">
          <h2>110B 국민대</h2>
        </div>
      </Link>
      */}
      <div className="bookmarkedList">
        {userStationBookmarkedList.map((bookmark: DocumentData)=> {
          // console.log(bookmark);
          return <StationBookmarkCard 
          key={bookmark.bookmarkedStationUid}
          stationUid={bookmark.bookmarkedStationUid}
          stationName={bookmark.bookmarkedStationName}
          stationNextStn={bookmark.bookmarkedStationNextSt}
          />
        })}
        {userRouteBookmarkedList.map((bookmark: DocumentData)=>{
          // console.log(bookmark);
          return <RouteBookmarkCard 
            key={bookmark.bookmarkedRouteId}
            busRouteId={bookmark.bookmarkedRouteId}
            routeName={bookmark.bookmarkedRouteName}
          />
        })}
      </div>
    </div>
  );
};

export default Home;
