import { authService } from "FirebaseApp";
import "css/App.css";
import AppRouter from "components/Router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (userObj) => {
      if (userObj) {
        setIsLoggedIn(true);
        setUser(userObj);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>bus-plus</h1>
      </header>
      {init ? (
        <div className="App-router">
          <AppRouter isLoggedIn={isLoggedIn} user={user} />
        </div>
      ) : (
        <h1>loading...</h1>
      )}
      {/* <footer>Foot</footer> */}
    </div>
  );
}

export default App;
