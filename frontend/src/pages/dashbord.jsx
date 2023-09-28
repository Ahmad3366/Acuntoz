import { Link, Routes, Route, NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

import Users from "../components/Users";
import NewContract from "../components/NewContract";
import Contracts from "../components/Contracts";
import CompanyProfile from "../components/CompanyProfile";

const Dashbord = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <div className="dashbord">
      <div className="head">
        <p>{user.username} - logged in</p>
        <button className="logout" onClick={logout}>Log Out</button>
      </div>
      <nav>
        <div className="links">
          <NavLink to={"/dashbord/users"}>Users</NavLink>
          <NavLink to={"/dashbord/contracts"}>Contracts</NavLink>
          <NavLink to={"/dashbord/companyProfile"}>Company Profile</NavLink>
          <NavLink to={"/dashbord/reports"}>Reports</NavLink>
          <NavLink to={"/dashbord/notes"}>Notes</NavLink>
        </div>
      </nav>
      <div className="page">
        <aside>
          <Link className="newUserLink" to={"/createUser"}>Create New User</Link>
          <div className="sections">
            <section>
              <h3>Pre-Award</h3>
              <NavLink to='/dashbord/new-contract'>Create New Contract</NavLink>
              <NavLink to='/dashbord/dispatch-rft'>Dispatch RFT</NavLink>
            </section>
            <section>
              <h3>Award</h3>
            </section>
          </div>
        </aside>
        <div className="content">
          <Routes>
            <Route path="users" element={<Users />} />
            <Route path="new-contract" element={<NewContract />} />
            <Route path="contracts" element={<Contracts />} />
            <Route path="companyProfile" element={<CompanyProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
