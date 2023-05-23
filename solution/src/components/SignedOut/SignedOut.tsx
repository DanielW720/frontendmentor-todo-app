import { useState } from "react";
import LoginForm from "../loginForm/LoginForm";
import googleLogo from "../../assets/images/google-logo.svg";
import { signInUser } from "../../firebase";

export const SignedOut = () => {
  const [loginForm, setLoginForm] = useState(true);

  return (
    <div className="relative bottom-24">
      <div className="text-2xl flex justify-around dark:text-darkGrayishBlue">
        <button
          className={`${loginForm && "text-brightBlue"} transition-all `}
          onClick={() => setLoginForm(true)}
        >
          <h2 className="">Login</h2>
        </button>
        <button
          className={`${!loginForm && "text-brightBlue"} transition-all`}
          onClick={() => setLoginForm(false)}
        >
          <h2>Register</h2>
        </button>
      </div>
      <LoginForm loginForm={loginForm} />
      <div className="shadow-headerRight shadow-sm-symmetric flex justify-around items-center rounded-lg mt-12 p-2">
        <img src={googleLogo} alt="Google logo" width="20px" />
        <button
          onClick={() => {
            signInUser("google");
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
