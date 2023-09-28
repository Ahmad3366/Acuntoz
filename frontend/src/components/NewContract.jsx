import { useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewContract = () => {
  const {user} = useAuthContext()

  const [ref, setRef] = useState("");
  const [budget, setBudget] = useState("");
  const [title, setTitle] = useState("");
  const [fee, setFee] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState("");

  const [loading, setLoading] = useState(false);

  const handleFile = async (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setFile(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    const res = await fetch(
      `${import.meta.env.VITE_API_URI}/contracts/newContract`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ ref, budget, title, fee, deadline, file }),
      }
    );
    const json = await res.json();
    if (!res.ok) {
      setLoading(false)
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
      setLoading(false)
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
    <div className="new-contract">
      <h3>New Contract Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <div className="container">
            <label>Contract Ref #</label>
            <input
              type="text"
              onChange={(e) => setRef(e.target.value)}
              required
            />
          </div>
          <div className="container">
            <label>Original Budget ($)</label>
            <input
              type="number"
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="wrapper">
          <div
            className="container"
            style={{ width: "100%", boxSizing: "border-box" }}
          >
            <label>Contract Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="wrapper">
          <div className="container">
            <label>Tender fee ($)</label>
            <input
              type="number"
              onChange={(e) => setFee(e.target.value)}
              required
            />
          </div>
          <div className="container">
            <label>Tender Deadline</label>
            <input
              type="date"
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="wrapper">
          <div className="container">
            <label>Tender File</label>
            <input type="file" accept=".pdf" onChange={handleFile} required />
          </div>
        </div>
        {!loading && <button type="submit">Create</button>}
        {loading && <button type="submit" disabled>Creating...</button>}
        <button type="reset">Reset</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NewContract;
