import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(null);
    dispatch(loginUser({ email, password })).then((res) => {
      setLoading(false);
      if (res.payload !== undefined) {
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        if (res.error.message === "Request failed with status code 401") {
          setLoginError("Access Denied! Invalid username or password");
        } else {
          setLoginError(res.error.message);
        }
      }
    });
  };

  return (
    <form onSubmit={handleLogin} className="custom-form">
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter Email"
          className="form-control"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter Password"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-success btn-sm w-100">
        {loading ? "Please Wait..." : "LOGIN"}
      </button>
      {loginError && <div className="text-danger">{loginError}</div>}
    </form>
  );
};

export default Login;
