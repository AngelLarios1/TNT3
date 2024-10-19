import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles/login.scss";


function Login() {
  const [curp, setCurp] = useState("");
  const [gmail, setGmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular autenticación
    if (curp === "LATA050223HASRRNA7" && gmail === "angela1@gmail.com") {
      navigate("/inicio/inicio");
    } else {
      alert("CURP o gmail incorrectos");
    }
  };

  return (
    <div className="fondoLogin">
    <div className="login-container">
      <h2>Login</h2>
      <div className="buttons">
            <a href="https://identity.ic0.app/">
              <img
                src="https://seeklogo.com/images/I/internet-computer-icp-logo-02DE976C1A-seeklogo.com.png"
                className="button-image"
                alt="Login"
              />
            </a>
            </div>
      <form onSubmit={handleSubmit}>
  
        <div>
          <label htmlFor="curp">CURP:</label>
          <h4></h4>
          <input
            type="text"
            id="curp"
            value={curp}
            onChange={(e) => setCurp(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gmail">Ingresa tu correo:</label>
          <input
            type="gmail"
            id="gmail"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
    </div>
    </div>
 
  );
}

export default Login;
