import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";
import {useEffect} from "react";
import Auth from "./Auth.tsx";
import * as fetchUser from "./api/fetchUser.ts";
import {userStore} from "./store/userStore.ts";
import {getCookie} from "./utils/cookie.ts";

const App = () => {
  const {isLoggedIn, setIsLoggedIn} = userStore((state) => {
    return {
      isLoggedIn: state.isLoggedIn,
      setIsLoggedIn: state.setIsLoggedIn
    }
  })
  useEffect(() => {
    (async () => {
      const token = getCookie("token");
      const res = await fetchUser.isLoggedIn(token);
      const {status} = res;
      if (status === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    })();
  }, [])
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              isLoggedIn ? <Home /> : <Auth />
            } />
          </Routes>
        </BrowserRouter>
      </>
  );
};

export default App;