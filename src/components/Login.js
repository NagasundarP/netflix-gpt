import { useState, useRef } from "react";
import Header from "./Header";
import { BG_IMG_URL } from "../utils/constants";
import { checkValidDataSignIn, checkValidDataSignUp } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const handleButtonClick = () => {
    const nameInput = name.current ? name.current.value : "";
    const emailInput = email.current ? email.current.value : "";
    const passwordInput = password.current ? password.current.value : "";
    const confirmPasswordInput = confirmPassword.current
      ? confirmPassword.current.value
      : "";

    const message = !isSignInForm
      ? checkValidDataSignUp(
          nameInput,
          emailInput,
          passwordInput,
          confirmPasswordInput
        )
      : checkValidDataSignIn(emailInput, passwordInput);

    setErrorMessage(message);
    if (message) return;

    // sign up and sign in logic
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: nameInput,
            photoURL: "https://avatars.githubusercontent.com/u/55275045?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <div className="absolute inset-0">
        <img
          src={BG_IMG_URL}
          alt="netflix background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-md w-full p-8 bg-black bg-opacity-70 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full name"
              className="py-4 px-4 mb-4 w-full bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="py-4 px-4 mb-4 w-full bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="py-4 px-4 mb-4 w-full bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
          />

          {!isSignInForm && (
            <input
              ref={confirmPassword}
              type="password"
              placeholder="Confirm Password"
              className="py-4 px-4 mb-4 w-full bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          )}
          {/* error message */}
          <p className="text-red-700 text-lg font-bold py-2">{errorMessage}</p>

          <button
            className="py-4 my-6 w-full bg-red-700 rounded hover:bg-red-800 cursor-pointer"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4" onClick={toggleSignInForm}>
            {isSignInForm ? (
              <>
                New to Netflix?{" "}
                <span className="text-red-700 cursor-pointer">
                  Sign Up now!
                </span>
              </>
            ) : (
              <>
                Already a user?{" "}
                <span className="text-red-700 cursor-pointer">
                  Sign In now!
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
