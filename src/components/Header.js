import { useNavigate, useLocation } from "react-router-dom";
import { HEADER_IMG_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptToggle = () => {
    dispatch(toggleGptSearchView());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const isSignInPage = location.pathname === "/";

  return (
    <div className="absolute w-full z-10 bg-gradient-to-b from-black flex justify-between items-center p-4 sm:p-6 lg:px-12">
      <img
        className="w-28 sm:w-36 lg:w-44"
        src={HEADER_IMG_URL}
        alt="Netflix logo"
      />
      {!isSignInPage && (
        <div className="flex items-center space-x-2 sm:space-x-4">
          {showGptSearch && (
            <>
              <select
                className="bg-red-800 text-white text-sm sm:text-base px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </>
          )}
          <button
            className="bg-red-800 text-white text-sm sm:text-base px-2 py-2 sm:px-4 sm:py-2 rounded-lg"
            onClick={handleGptToggle}
          >
            {showGptSearch ? "Home" : "Search GPT"}
          </button>
          <img
            alt="user-icon"
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 m-2"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="font-bold text-white text-sm sm:text-base cursor-pointer m-2"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
