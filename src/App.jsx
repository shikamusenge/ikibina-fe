import { Route, Routes } from "react-router-dom";
import "./App.css";
import MembersLogin from "./pages/MembersLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/admins/AdminHome";
import MemberHome from "./pages/members/MembetHome";
import SupperAdminHome from "./pages/admins/SupperAdminHome";
import Members from "./pages/admins/Members";
import Logout from "./components/Logout";
import SavingPage from "./pages/admins/SavingPage";
import Penalities from "./pages/admins/Penalities";
import ApplyLoan from "./pages/members/ApplyLoan";
import MyLoans from "./pages/members/Loan";
import LoansPage from "./pages/admins/LoansPage";
import Users from "./pages/admins/Users";
import MemberSavings from "./pages/admins/MemberSavings";
import Report from "./pages/admins/Report";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<MembersLogin />} />
        <Route path="/kwinjira/uhagarariye" element={<AdminLogin />} />
        <Route path="/uhagarariye" element={<AdminHome />} />
        <Route path="/uhagarariye/abanyamuryango" element={<Members />} />
        <Route path="/uhagarariyemukuru" element={<SupperAdminHome />} />
        <Route path="/uhagarariye/kwizigama" element={<SavingPage />} />
        <Route path="/uhagarariye/ubwizigame" element={<MemberSavings />} />
        <Route path="/uhagarariye/ibihano" element={<Penalities />} />
        <Route path="/uhagarariye/inguzanyo" element={<LoansPage />} />
        <Route path="/uhagarariye/raporo" element={<Report />} />
        <Route path="/uhagarariye/user" element={<Users />} />
        <Route path="/umunyamuryango" element={<MemberHome />} />
        <Route path="/umunyamuryango/inguzanyo" element={<MyLoans />} />
        <Route
          path="/umunyamuryango/inguzanyo/gusaba"
          element={<ApplyLoan />}
        />

        <Route path="/sohoka" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
