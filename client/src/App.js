import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import PostScreen from "./screens/PostScreen/PostScreen";
import { useNavigate } from "react-router-dom";
import AddPostScreen from "./screens/AddPostScreen/AddPostScreen";
import axios from "axios";
import AddImageScreen from "./screens/AddImageScreen/AddImageScreen";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import MyRequestsScreen from "./screens/MyRequestsScreen/MyRequestsScreen";
const App = () => {
  let navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [profileFilled, setProfileFilled] = useState(false);
  useEffect(() => {
    if (!profileFilled && isAuth) {
      navigate("/profile");
    }
  }, [profileFilled, isAuth]);
  useEffect(() => {
    async function checkAuth() {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const res = await axios.post("/auth/is_auth", {}, config);
        setProfileFilled(res.data.isProfile);
        setIsAuth(res.data.isAuth);
      } catch (err) {
        setIsAuth(false);
      }
    }
    checkAuth();
    return () => {
      setIsAuth(false);
    };
  }, []);
  return (
    <div>
      <header>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} />
      </header>
      <main>
        <Routes>
          <Route exact path="/post/:id" element={<PostScreen />} />
          <Route exact path="/addimage/:id" element={<AddImageScreen />} />
          <Route exact path="/search" element={<SearchScreen />} />
          <Route exact path="/myrequests" element={<MyRequestsScreen />} />

          <Route path="/" element={<HomeScreen isAuth={isAuth} />} />
          <Route path="/addpost" element={<AddPostScreen isAuth={isAuth} />} />
          <Route
            path="/register"
            element={<RegisterScreen isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route
            path="/login"
            element={
              <LoginScreen
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                setProfileFilled={setProfileFilled}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProfileScreen
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                setProfileFilled={setProfileFilled}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProfileScreen
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                setProfileFilled={setProfileFilled}
              />
            }
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
