import { authService } from "FirebaseApp";
import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  deleteUser,
  reauthenticateWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const onLogoutClicked = () => {
    authService.signOut();
    navigate("/");
  };

  const onDeleteAccountClicked = async () => {
    const user: User = authService.currentUser!;
    const providerId = user.providerData[0].providerId;
    let provider: AuthProvider;
    if (providerId === "google.com") {
      provider = new GoogleAuthProvider();
    }
    if (providerId === "github.com") {
      provider = new GithubAuthProvider();
    }

    // if(result )
    await reauthenticateWithPopup(user, provider!)
      .then(async () => {
        console.log(" // User re-authenticated.");
        // User re-authenti!cated.
        await deleteUser(user)
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        // An error ocurred
        // ...
      });
  };

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={onLogoutClicked}>Log Out</button>
      <button onClick={onDeleteAccountClicked}>Delete Account</button>
    </div>
  );
};

export default Profile;
