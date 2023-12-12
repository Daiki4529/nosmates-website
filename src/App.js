import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignUpModal from "./components/SignUpModal";
import SignInModal from "./components/SignInModal";
import Profile from "./pages/Profile/Profile";
import ProfileHome from "./pages/Profile/ProfileHome/ProfileHome";
function App() {
  return (
    <>
      <Navbar />
      <SignUpModal />
      <SignInModal />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}>
          <Route path="/profile/profile-home" element={<ProfileHome />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
