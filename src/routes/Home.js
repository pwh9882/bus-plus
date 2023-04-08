import { authService } from "FirebaseApp";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const onLogoutClicked = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <div>
      <button onClick={onLogoutClicked}>Log Out</button>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
