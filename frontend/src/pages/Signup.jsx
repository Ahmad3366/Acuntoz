import { useState } from "react";
import {useSignup} from '../hooks/useSignup'
import frame from "/Frame 2.png";

const Signup = () => {
  const {signup, isLoading, error, message} = useSignup()
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [Ierror, setIerror] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIerror(null)
    
    if (password !== cpassword) {
      setIerror('password and Confirm password fields doesn\'t matched')
      return console.error("error");
    }
    // console.log(username, email, password, cpassword);
    await signup(username, email, password)
  };

  return (
    <div className="home">
      <img src={frame} />
      <div className="form-container">
        <form className="signup" onSubmit={handleSubmit}>
          <h3>Sign up</h3>
          <label>*UserName</label>
          <input
            type="text"
            required
            onChange={(e) => setusername(e.target.value)}
            value={username}
          />
          <label>*Email</label>
          <input
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>*Password</label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label>*Confirm Password</label>
          <input
            type="password"
            required
            onChange={(e) => setCPassword(e.target.value)}
            value={cpassword}
          />
          {!isLoading && <button>SignUp</button>}
          {isLoading && <button>Signing up ...</button>}
          {error && <div className="error">{error}</div>}
          {Ierror && <div className="error">{Ierror}</div>}
          {message && <div className="message">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
