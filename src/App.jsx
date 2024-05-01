import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/login";
import DepositPage from "./pages/deposit";
import WithdrawalPage from "./pages/withdrawal";
import Template from "./pages/template";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

export default function App() {
    return (
        <Template>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/deposit" element={<DepositPage />} />
                <Route path="/withdrawal" element={<WithdrawalPage />} />
            </Routes>
        </Template>
    );
}
