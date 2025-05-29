import { Routes, Route } from "react-router-dom";
import { Home as HomePage } from "../home/home";
import { User as UserPage } from "../user/user";
import { LandingPage } from "../landing_page/landing_page";
import { Help as HelpPage } from "../help/help";
import { Login } from "../login/login.jsx"; 
import { Register } from "../register/register.jsx";


export const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
    </div>
); 