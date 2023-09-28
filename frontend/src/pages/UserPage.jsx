import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import UpdateProfile from "../components/UpdateProfile";

const UserPage = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()

  return (
    <div className="userpage">
      <div className="head">
        <p>{user.username} - logged in</p>
        <button className="logout" onClick={logout}>
          Log Out
        </button>
      </div>
      <div className="content">
      <UpdateProfile />
      </div>
    </div>
  );
};

export default UserPage;
