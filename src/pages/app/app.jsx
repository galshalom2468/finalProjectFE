import { Routes, Route } from "react-router-dom";
import { Home as HomePage } from "../home/home";
import { LandingPage } from "../landing_page/landing_page";
import { CreatePage } from "../create/create";
import { Login } from "../login/login.jsx"; 
import { Register } from "../register/register.jsx";
import { HistoryPage } from "../history_page/history_page.jsx";
import { Library } from "../library/library.jsx";
import { Summary } from "../summary/summary.jsx";
import { Dashboard } from "../dashboard/dashboard.jsx";

export const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/create/:id" element={<CreatePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/history_page" element={<HistoryPage />} />
      <Route path="/library" element={<Library />} />
      <Route path="/summary/:id" element={<Summary />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
    </div>
); 