import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages
import Home from "./pages/home";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Error from "./pages/error";
//components
import Navbar from "./components/navbar";
import { LetterSelectionGuest } from "./pages/letterSelectionGuest";
import { PackageSelectionGuest } from "./pages/packageSelectionGuest";
import { Particle } from "./particles";

function App() {
  return (
    <>
      <BrowserRouter>
      <Particle/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              path="/home/letterSelection"
              element={<LetterSelectionGuest />}
            />
            <Route
              path="/home/packageSelection"
              element={<PackageSelectionGuest />}
            />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
