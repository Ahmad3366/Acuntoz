import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {

  const {login, isLoading, error} = useLogin()

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password)
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>
      <label>*UserName</label>
      <input
        type="text"
        required
        onChange={(e) => setusername(e.target.value)}
        value={username}
      />
      <label>*Password</label>
      <input
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {!isLoading && <button>Login</button>}
      {isLoading && <button disabled>Logining...</button>}
      <p>
        forgot your password ?{" "}
        <Link to="/forgot-password">
          <b>Click here</b>
        </Link>
      </p>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LoginForm;