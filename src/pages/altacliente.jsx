import React, { useState } from "react";
import "../pages/altacliente.css";
import routePaths from "../routePaths";

import { Link } from "react-router-dom";
import Header from "../common/header";

const AltaCliente = () => {
  const label = document.getElementById("error");
  const [nombrecliente, setNombre] = useState("");
  const [direccioncliente, setDireccion] = useState("");
  const [telefonocliente, setTelefono] = useState("");

  const ingresocliente = () => {
    if (nombrecliente && direccioncliente && telefonocliente) {
      const objetoBody = {
        nombrecliente: nombrecliente,
        direccioncliente: direccioncliente,
        telefonocliente: telefonocliente,
      };
      console.log(objetoBody);
      fetch("http://localhost:3000/Clientes/ingreso", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objetoBody),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          debugger;

          if (!response.error) {
            label.textContent = response.message;
            label.style.color = "#FF0000";
            if (response.success) {
              label.textContent = "Cliente Creada Correctamente";
              label.style.color = "green";
            }
          } else {
            label.textContent = "Mal";
            label.style.color = "#FF0000";
          }
        });
    } else {
      label.textContent = "Falta completar campos";
      label.style.color = "#FF0000";
    }
  };

  return (
    <div>
      <Header />
      <registrocuerpo>
        <div class="wrappercenter">
          <div class="title">Alta de Cliente</div>
          <div class="form">
            <div class="inputfield">
              <label>Cliente:</label>
              <input
                onChange={(event) => setNombre(event.target.value)}
                type="text"
                class="input"
                id="nombre"
              />
            </div>
            <div class="inputfield">
              <label>Direccion:</label>
              <input
                onChange={(event) => setDireccion(event.target.value)}
                type="text"
                class="input"
                id="direccioncliente"
              />
            </div>
            <div class="inputfield">
              <label>Telefono:</label>
              <input
                onChange={(event) => setTelefono(event.target.value)}
                type="text"
                class="input"
                id="telefono"
              />
            </div>
            <table class="tablaform">
              <tr>
                <td>
                  <div class="inputfield" id="registro">
                    <input
                      onClick={ingresocliente}
                      type="submit"
                      id="botonregistro"
                      value="Alta de Cliente"
                      class="btnlogin"
                    />
                  </div>
                </td>
                <td>
                  <div class="inputfield" id="plan">
                    <Link
                      to={routePaths.listarcliente}
                      className="btnchooseplan"
                    >
                      {" "}
                      Volver al Listado de Clientes{" "}
                    </Link>
                  </div>
                </td>
              </tr>
            </table>
            <label id="error"></label>
          </div>
        </div>
      </registrocuerpo>
    </div>
  );
};

export default AltaCliente;
