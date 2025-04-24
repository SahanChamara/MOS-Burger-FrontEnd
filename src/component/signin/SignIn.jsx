import { useState } from "react";
import "./signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const[user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) =>{
    setUser({
      ...user,[e.target.name]: e.target.value});
  };

  let [erorMsg, setErorMsg] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('http://localhost:8080/api/v1/login',user)
    .then(response => {
      if(response.data==="Login Successful"){
          navigate('/home');
      }else {
        setErorMsg("Unauthorized Access - User Name or Password Not Found");
      }
    })    
  };

  return (
    <div>
      <div className="body">
        <div className="login-container">
          <div className="brand-section">
            <h2>Welcome to Mos Burger POS </h2>
            <p>
              Access your point of sale system with enhanced security and a
              streamlined interface designed for efficiency.
            </p>
          </div>
          <div className="login-form">
            <div className="form-header">
              {erorMsg && <p className="error-msg">{erorMsg}</p>}
              <h1>Login to POS</h1>
              <p>Enter your credentials to access the System</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  id="email"                  
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
                <i className="fas fa-user"></i>
              </div>
              <div className="input-group">
                <input
                  type="password"
                  id="pass"                  
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
                <i className="fas fa-lock"></i>
              </div>
              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
