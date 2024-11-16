import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Account from "./pages/dashboard/Account";
import Home from "./pages/home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Trade from "./pages/dashboard/Trade";
import Faq from "./pages/dashboard/Faq";
import Transaction from "./pages/dashboard/Transaction";
import Withdraw from "./pages/dashboard/Withdraw";
import DepositPage from "./pages/dashboard/DepositPage";
import AdminLayout from "./components/AdminLayout";
// import Help from "./pages/dashboard/Help";
import Security from "./pages/dashboard/Security";
import Dashboard from "./pages/dashboard/Dashboard";
import SingleTrade from "./pages/dashboard/Admin/trade/SingleTrade";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
export default function MyApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route
                    path="/account"
                    element={
                        <ProtectRoute>
                            <Account />
                        </ProtectRoute>
                    }
                />
                {/* <Route path='/deposit' element={<Deposit/>} ></Route>
      <Route path="/deposit/:name" element={<DepositDes/>} /> */}
                <Route
                    path="/deposit"
                    element={
                        <ProtectRoute>
                            <DepositPage />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="/withdraw"
                    element={
                        <ProtectRoute>
                            <Withdraw />
                        </ProtectRoute>
                    }></Route>
                <Route
                    path="/trade"
                    element={
                        <ProtectRoute>
                            <Trade />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="/trade/:id/:currency"
                    element={
                        <ProtectRoute>
                            <DashboardLayout layout={<SingleTrade />} />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="/trade-single"
                    element={
                        <ProtectRoute>
                            <SingleTrade />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="/faq"
                    element={
                        <ProtectRoute>
                            <Faq />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="/security"
                    element={
                        <ProtectRoute>
                            <Security />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectRoute>
                            <Dashboard />
                        </ProtectRoute>
                    }
                />

                <Route
                    path="/transaction"
                    element={
                        <ProtectRoute>
                            <Transaction />
                        </ProtectRoute>
                    }
                />

                <Route
                    path="admin-get-all-user"
                    element={
                        <ProtectRoute>
                            <AdminLayout otherComponent={"userIndex"} />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="admin-netwok"
                    element={
                        <ProtectRoute>
                            <AdminLayout otherComponent={"network"} />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="admin-coin-verify"
                    element={
                        <ProtectRoute>
                            <AdminLayout otherComponent={"index"} />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="admin-user-kyc"
                    element={
                        <ProtectRoute>
                            <AdminLayout otherComponent={"kyclists"} />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="user-coins"
                    element={
                        <ProtectRoute>
                            <AdminLayout otherComponent={"userCoinLists"} />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="user-trades"
                    element={
                        <ProtectRoute>
                            <AdminLayout otherComponent={"userTrades"} />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="admin-currency"
                    element={
                        <ProtectRoute>
                            <AdminLayout otherComponent={"currency"} />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectRoute>
                            <AdminLayout otherComponent={"adminHome"} />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="/admin-trade-list"
                    element={
                        <ProtectRoute>
                            <AdminLayout otherComponent={"tradeIndex"} />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="admin-user-withdrawl"
                    element={
                        <ProtectRoute>
                            <AdminLayout otherComponent={"withdrawlLists"} />
                        </ProtectRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

const ProtectRoute = ({ children }) => {
    let token = localStorage.getItem("AUTH-TOKEN");
    if (token) {
        return token && children;
    } else {
        return <Navigate to={"/"} />;
    }
};
