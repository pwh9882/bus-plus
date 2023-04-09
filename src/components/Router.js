import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";
import Search from "routes/Search";
import BusRouteDetail from "routes/BusRouteDetail";
import StationDetail from "routes/StationDetail";

const AppRouter = ({ isLoggedIn, user }) => {
  return (
    <Router>
      <header></header>
      {isLoggedIn && <Navigation user={user} />}
      <Routes>
        {isLoggedIn ? (
          <Route exact path="/" element={<Home />} />
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}

        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/bus-route-detail" element={<BusRouteDetail />} />
        <Route path="/station-detail" element={<StationDetail />} />

        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
