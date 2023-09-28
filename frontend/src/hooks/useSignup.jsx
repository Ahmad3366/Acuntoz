import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {

  const {user} = useAuthContext()
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);
    setMessage(null); 

    const res = await fetch(import.meta.env.VITE_API_URI + "/user/signup", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`   
      },
      body: JSON.stringify({ username, email, password }),
    });
    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
      setMessage(null);
    }

    if (res.ok) {
      setMessage(json.mess);
      setError(null);
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, message };
};
