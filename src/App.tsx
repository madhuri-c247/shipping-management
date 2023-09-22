import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//CSS
import "./App.css";
//pages
import Home from "./pages/home";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Error from "./pages/error";
import User from "./pages/user";
//home-pages
import { LetterSelectionGuest } from "./pages/home/letterSelectionGuest";
import { PackageSelectionGuest } from "./pages/home/packageSelectionGuest";
//user-pages
import Quote from "./pages/user/quote";
import SavedQuote from "./pages/user/saved-quote";
import Shipment from "./pages/user/shipment";
import Setting from "./pages/user/setting";
import Notification from "./pages/user/notification";
import Letter from "./pages/user/quote/letter";
import Package from "./pages/user/quote/package";
import Verification from "./pages/signup/verification";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Particle /> */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />}>
            <Route
              path="/home/letter-selection"
              element={<LetterSelectionGuest />}
            />
            <Route
              path="/home/package-selection"
              element={<PackageSelectionGuest />}
            />
          </Route>
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/mail/account-verification-mail"
            element={<Verification />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />}>
            <Route path="/user/quote" element={<Quote />}>
              <Route path="/user/quote/letter" element={<Letter />} />
              <Route path="/user/quote/package" element={<Package />} />
            </Route>
            <Route path="/user/saved-quotes" element={<SavedQuote />} />
            <Route path="/user/shipment" element={<Shipment />} />
            <Route path="/user/setting" element={<Setting />} />
            <Route path="/user/notification" element={<Notification />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
