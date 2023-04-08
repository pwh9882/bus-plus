import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <header></header>
      <Routes>
        <Route exact path="/" element={<h1>Home</h1>} />
        <Route path="/profile" element={<h1>profile</h1>} />

        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
