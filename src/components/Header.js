import { useNavigate, useLocation } from "react-router-dom";
import { HEADER_IMG_URL, PROFILE_IMG } from "../utils/constants";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(store => store.user)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };


  const isSignInPage = location.pathname === "/";

  return (
    <div className="absolute w-screen z-10 bg-gradient-to-b from-black flex justify-between p-4">
      <img className="w-44" src={HEADER_IMG_URL} alt="Netflix logo" />
      {!isSignInPage && (
        <div className="flex items-center">
          <img alt="user-icon" className="w-12 h-12 m-2" src={user?.photoURL} />
          <button
            onClick={handleSignOut}
            className="font-bold text-white cursor-pointer m-2"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
