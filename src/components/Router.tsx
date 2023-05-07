import {
  
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Search from "routes/Search";
import BusRouteDetail from "routes/BusRouteDetail";
import StationDetail from "routes/StationDetail";
import { User } from "firebase/auth";



import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useEffect, useState } from "react";
import PlusEstimateArrivalTime from "routes/plusEstimateArrivalTime";

interface Props {
  isLoggedIn: boolean,
  user: User|null
}

const AppRouter = ({ isLoggedIn, user }: Props) => {
  const [navOption, setNavOption] = useState(0)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    if(location.pathname === "/"){
      setNavOption(0);
    }
    else if(location.pathname === "/search"){
      setNavOption(1);
    }
    else if(location.pathname === "/profile"){
      setNavOption(2);
    } else {
      setNavOption(-1);
    }
  },[location])
  return (
    <>
      {/* <NavigationBar user={user} /> */}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home user={user}/>} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/station-detail" element={<StationDetail user={user}/>} />
            <Route path="/bus-route-detail" element={<BusRouteDetail user={user} />} />
            <Route path="/plus-estimate-arrival-time" element={<PlusEstimateArrivalTime/>}/>
          </>
        ) : (
          <Route  path="/" element={<Auth />} />
        )}

        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
      </Routes>
      {isLoggedIn && 
      // (location.pathname === "/" || location.pathname === "/search" || location.pathname === "/profile") &&
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex:3}} elevation={3}>
       <BottomNavigation
        showLabels
        value={navOption}
        onChange={(event, newValue) => {
          setNavOption(newValue);
          // console.log(newValue);
          if(newValue===0){
            navigate("/")
          }
          if(newValue===1){
            navigate("/search")
          }
          if(newValue===2){
            navigate("/profile")
          }
          
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Account" icon={<AccountBoxIcon />} />
      </BottomNavigation>
      </Paper>}
      
      </>
  );
};

export default AppRouter;
