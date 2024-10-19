import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/registro.scss"

function Registro() {
  const [nombre, setNombre] = useState("");
  const [curp, setCurp] = useState("");
  const [gmail, setGmail] = useState("");
  const [confirmGmail, setConfirmGmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica que las contraseñas coincidan
    if (gmail !== confirmGmail) {
      alert("Las gmail no coinciden");
      return;
    }

    // Aquí podrías hacer la lógica para registrar al usuario
    // Simulación de registro exitoso
    alert("Registro exitoso");
    navigate("/inicio/inicio"); // Redirige al dashboard después de registrarse
  };

  return (
    <div className="fondoRegistro">
    <div className="registro-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="curp">CURP:</label>
          <input
            type="text"
            id="curp"
            value={curp}
            onChange={(e) => setCurp(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gmail">Ingresa tu gmail:</label>
          <input
            type="gmail"
            id="gmail"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmGmail">Confirmar tu correo:</label>
          <input
            type="gmail"
            id="confirmGmail"
            value={confirmGmail}
            onChange={(e) => setConfirmGmail(e.target.value)}
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
    </div>
  );
}

export default Registro;
