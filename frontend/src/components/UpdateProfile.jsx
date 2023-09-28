import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const { id } = useParams();
  const {user} = useAuthContext()

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [bio, setBio] = useState("");

  const handleCancel = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/user/users/${id}`, {
        method: "GET",
        headers: {'Content-Type': 'application/json', Authorization: `Bearer ${user.token}`}
      })
      const json = await res.json()

      if (res.ok) {
        setFirstName(json.firstName)
        setLastName(json.lastName)
        setEmail(json.email)
        setNumber(json.number)
        setCompany(json.company)
        setDesignation(json.designation)
        setBio(json.bio)
      }
      if (!res.ok) {
        console.log(json.error);
      }
    }
    getUser()
  }, [])
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    setIsLoading(true)
    
    if (!firstName || !lastName || !number || !company || !designation || !bio) {
      toast.error('all fields must be filled !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return
    }
    const data = {firstName, lastName, email, number, company, designation, bio}

    const res = await fetch(`${import.meta.env.VITE_API_URI}/user/users/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    const json = await res.json()

    if (!res.ok) {
      setIsLoading(false)
      toast.error(json.error, {
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
    if (res.ok) {
      setIsLoading(false)
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

  return (
    <div className="update-profile">
      <div className="wrapper">
        <h3>User Account Settings</h3>
        <form>
          <div className="field">
            <div>
              <label>First Name</label>
              <input
                type="text"
                required
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                required
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
          </div>
          <div className="field">
            <div>
              <label>Email</label>
              <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                required
                onChange={(e) => setNumber(e.target.value)}
                value={number}
              />
            </div>
          </div>
          <div className="field">
            <div>
              <label>Company</label>
              <input
                type="text"
                required
                onChange={(e) => setCompany(e.target.value)}
                value={company}
              />
            </div>
            <div>
              <label>Designation</label>
              <input
                type="text"
                required
                onChange={(e) => setDesignation(e.target.value)}
                value={designation}
              />
            </div>
          </div>
          <div className="field">
            <div>
              <label>Bio</label>
              <textarea
                required
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              ></textarea>
            </div>
          </div>
          <div className="actions">
            {!isLoading && <button onClick={handleUpdate}>Update</button>}
            {isLoading && <button disabled>Updating...</button>}
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfile;
