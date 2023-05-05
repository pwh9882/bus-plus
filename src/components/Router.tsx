import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import NavigationBar from "./NavigationBar";
import Search from "routes/Search";
import BusRouteDetail from "routes/BusRouteDetail";
import StationDetail from "routes/StationDetail";
import { User } from "firebase/auth";

interface Props {
  isLoggedIn: boolean,
  user: User|null
}

const AppRouter = ({ isLoggedIn, user }: Props) => {
  return (
    <Router>
      {/* <header></header> */}

      {isLoggedIn && <NavigationBar user={user} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home user={user}/>} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/station-detail" element={<StationDetail user={user}/>} />
            <Route path="/bus-route-detail" element={<BusRouteDetail />} />
          </>
        ) : (
          <Route  path="/" element={<Auth />} />
        )}

        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
