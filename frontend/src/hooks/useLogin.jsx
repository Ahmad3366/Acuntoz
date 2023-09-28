import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";


export const useLogin = () => {
  // const navigator = useNavigate()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispach } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch(import.meta.env.VITE_API_URI + "/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispach({ type: "LOGIN", payload: json });
      setIsLoading(false);
      // navigator('/dashbord')
    }
  };

  return {login, isLoading, error}
};
