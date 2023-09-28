import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUsersContext } from '../hooks/useUsersContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from "./searchbar";


const Users = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const {users, dispatch, isSearching, foundUsers} = useUsersContext()

  // const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URI}/user/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await res.json();

      if (res.ok) {
        // setUsers(json);
        dispatch({type: 'GET_USERS', payload: json})
        // console.log(json);
        setLoading(false);
      }
      if (!res.ok) {
        setLoading(false);
        setError(json.error);
      }
    };
    getUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/user/${userId}/update-profile`);
  };
  const handleView = (userId) => {
    console.log(userId);
  };
  const handleDelete = async (userId) => {
    const res = await fetch(`${import.meta.env.VITE_API_URI}/user/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    const json = await res.json()

    if (res.ok) {
      setLoading(false)
      dispatch({type: 'DELETE_USER', payload: json.user})
      toast.success(json.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  const Users = isSearching ? foundUsers : users

  return (
    <div className="users">
      <h3>User Accounts Log</h3>
      {loading && <p>Loading...</p>}
      <div className="userlog">
        <div className="search">
          <Searchbar type='users' />
        </div>
        <table>
          <thead>
            <tr className="header">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Company</th>
              <th>Designation</th>
              <th>Bio</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Users &&
              Users.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>{user.company}</td>
                  <td>{user.designation}</td>
                  <td>{user.bio}</td>
                  <td>photo.jpg</td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="view"
                      onClick={() => handleView(user._id)}
                    >
                      View
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Users;
