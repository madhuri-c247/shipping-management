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
import Setting from "./pages/user/accountSetting";
import Letter from "./pages/user/quote/letter";
import Package from "./pages/user/quote/package";
//admin-pages
import Admin from "./pages/admin";
import AdminSavedQuote from "./pages/admin/savedQuotes";
import Verification from "./pages/signup/verification";
import Auth from "./Auth";
import { ForgotPassword } from "./pages/login/forgetPassword";
import ResetPassword from "./pages/login/resetPassword";
import AdminSetting from "./pages/admin/setting";
import AllUsers from "./pages/admin/user";
import Reports from "./pages/admin/reports";
import AllShipment from "./pages/admin/shipment";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<LetterSelectionGuest />} />
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

          <Route
            path="/mail/account-verification-mail"
            element={<Verification />}
          />
          <Route
            path="/user"
            element={
              <Auth>
                <User />
              </Auth>
            }
          >
            <Route path="/user/quote" element={<Quote />}>
              <Route path="/user/quote/letter" element={<Letter />} />
              <Route path="/user/quote/package" element={<Package />} />
            </Route>
            <Route path="/user/saved-quotes" element={<SavedQuote />} />
            <Route path="/user/shipment" element={<Shipment />} />
            <Route path="/user/setting" element={<Setting />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/saved-quotes" element={<AdminSavedQuote />} />
            <Route path="/admin/admin-setting" element={<AdminSetting />} />
            <Route path="/admin/all-users" element={<AllUsers />} />
            <Route path="/admin/report" element={<Reports />} />
            <Route path="/admin/all-shipment" element={<AllShipment />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/login/reset-password-verification"
            element={<ResetPassword />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
