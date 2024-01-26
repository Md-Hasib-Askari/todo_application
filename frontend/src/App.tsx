import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";
import React, {useEffect} from "react";
import Auth from "./Auth.tsx";
import * as fetchUser from "./api/fetchUser.ts";
import {userStore} from "./store/userStore.ts";
import {UserStore} from "./types/user.ts";

const App = () => {
  const {isLoggedIn, setIsLoggedIn} = userStore((state) => {
    return {
      isLoggedIn: state.isLoggedIn,
      setIsLoggedIn: state.setIsLoggedIn
    }
  })
  console.log("test");
  useEffect(() => {
    (async () => {
      const res = await fetchUser.isLoggedIn(document.cookie);
      const {status} = res;
      if (status === 200) {
        setIsLoggedIn();
      } else {
        setIsLoggedIn();
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