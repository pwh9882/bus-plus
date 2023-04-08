import { authService } from "FirebaseApp";
import "components/App.css";
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
        <AppRouter isLoggedIn={isLoggedIn} user={user} />
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
}

export default App;
