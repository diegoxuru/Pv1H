import React, { useState } from "react";
import "../pages/altacamion.css";
import routePaths from "../routePaths";

import { Link } from "react-router-dom";
import Header from "../common/header";

const AltaCamion = () => {
  const label = document.getElementById("error");
  const [nombrecamion, setNombre] = useState("");
  const [m3camion, setM3] = useState("");

  const ingresocamion = () => {
    if (nombrecamion && m3camion) {
      const objetoBody = {
        nombrecamion: nombrecamion,
        m3camion: m3camion,
      };
      console.log(objetoBody);
      fetch("http://localhost:3000/Camiones/ingreso", {
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
              label.textContent = "Camion Creado Correctamente";
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
        <div className="wrappercenter">
          <div className="title">Alta de Camion</div>
          <div className="form">
            <div className="inputfield">
              <label>Nombre:</label>
              <input
                onChange={(event) => setNombre(event.target.value)}
                type="text"
                className="input"
                id="nombre"
              />
            </div>
            <div class="inputfield">
              <label>M3:</label>
              <input
                onChange={(event) => setM3(event.target.value)}
                type="text"
                class="input"
                id="m3"
              />
            </div>
            <table class="tablaform">
              <tr>
                <td>
                  <div class="inputfield" id="registro">
                    <input
                      onClick={ingresocamion}
                      type="submit"
                      id="botonregistro"
                      value="Alta de Camion"
                      class="btnlogin"
                    />
                  </div>
                </td>
                <td>
                  <div class="inputfield" id="plan">
                    <Link
                      to={routePaths.listarcamion}
                      className="btnchooseplan"
                    >
                      {" "}
                      Volver al Listado de Camiones{" "}
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

export default AltaCamion;
