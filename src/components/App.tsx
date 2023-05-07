import { authService } from "FirebaseApp";
import "css/App.css";
import AppRouter from "components/Router";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, } from "react-router-dom";



function App() {
  const [init, setInit] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    onAuthStateChanged(authService, (userObj: User | null) => {
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

  return (<>
    <div className="App">
      <header className="App-header">
        <h1>bus-plus</h1>
      </header>
      {init ? (
        <div className="App-router">
          <Router basename={"/"} children->
            <AppRouter isLoggedIn={isLoggedIn} user={user} />
          </Router>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
      {/* <footer>Foot</footer> */}
      
    </div>
    
    </>
  );
}

export default App;
