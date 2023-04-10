import { authService } from "FirebaseApp";
import "css/Auth.css";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    console.log(name);
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <div>
      <h1>Bus-plus에 어서 오세요</h1>
      <h2>원하시는 기능으로 로그인 해주세요</h2>
      <div className="social-login-list">
        <button
          className="social-login-button"
          onClick={onSocialClick}
          name="google"
        >
          Continue with Google
        </button>
        <button
          className="social-login-button"
          onClick={onSocialClick}
          name="github"
        >
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
