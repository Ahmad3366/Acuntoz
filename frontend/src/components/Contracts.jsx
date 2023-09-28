import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useContractsContext } from "../hooks/useContractsContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./searchbar";

const Contracts = () => {
  const { user } = useAuthContext();
  // const [contracts, setContracts] = useState(null);
  const { contracts, dispatch, isSearching,  foundContracts} = useContractsContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getContracts = async () => {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/contracts/getContracts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await res.json();
      if (!res.ok) {
        setLoading(false);
        alert(json.error);
      }
      if (res.ok) {
        setLoading(false);
        dispatch({ type: "GET_CONTRACTS", payload: json });
      }
    };
    getContracts();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_URI}/contracts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "DELETE_CONTRACT", payload: json.contract });
      // alert(json.message)
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
    if (!res.ok) {
      console.log(json);
      alert(json.error);
    }
  };

  const Contracts = isSearching ? foundContracts : contracts

  return (
    <div className="contracts">
      <h3>Contracts Log</h3>
      {loading && <p>Loading...</p>}
      <div className="contractslog">
        <div className="search">
        <Searchbar type='contracts' />
        </div>
        <table>
          <thead>
            <tr className="header">
              <th>Contract Ref No.</th>
              <th>Original Budget</th>
              <th>Contract Title</th>
              <th>Tender fee</th>
              <th>Tender Deadline</th>
              <th>Tender File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Contracts &&
              Contracts.map((c) => (
                <tr key={c._id}>
                  <td>{c.ref}</td>
                  <td>{c.title}</td>
                  <td>${c.budget}</td>
                  <td>${c.fee}</td>
                  <td>{c.deadline}</td>
                  <td>
                    <a href={c.file} download={c.ref}>
                      {c.ref}.pdf
                    </a>
                  </td>
                  <td>
                    <button className="view">Edit</button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(c._id)}
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

export default Contracts;
