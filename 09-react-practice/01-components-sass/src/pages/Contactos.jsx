import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UseContext } from "../contexts/AuthContext";

const Contactos = () => {
  const { setLog } = useContext(UseContext);

  const handleLogOut = () => {
    setLog(false);
  };
  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>Contactos</h1>
      <Link
        to="/inicio"
        style={{
          background: "blue",
          color: "white",
          padding: "10px 25px",
          borderRadius: "15px",
        }}
      >
        Regresar
      </Link>

      <Link
        onClick={handleLogOut}
        to="/"
        style={{
          background: "crimson",
          color: "white",
          padding: "10px 25px",
          borderRadius: "15px",
        }}
      >
        Cerrar sesion
      </Link>
    </div>
  );
};

export default Contactos;
