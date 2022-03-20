import React, { useEffect, useState } from "react";
import "../pages/editarcliente.css";
import routePaths from "../routePaths";

import { Link } from "react-router-dom";
import Header from "../common/header";
import { useParams } from "react-router";

const EditarCamion = () => {
  let { id } = useParams();

  const getCamion = async () => {
    //e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/Camiones/buscarporid/${id}`
      );
      const jsonData = await response.json();

      setNombre(jsonData[0].nombrecamion);
      setM3(jsonData[0].m3camion);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCamion();
  }, []);

  const [nombrecamion, setNombre] = useState("");
  const [m3camion, setM3] = useState("");

  const label = document.getElementById("error");

  const editacamion = () => {
    if (nombrecamion && m3camion) {
      const objetoBody = {
        idcliente: id,
        nombrecamion: nombrecamion,
        m3camion: m3camion,
      };

      fetch("http://localhost:3000/Camiones/editar", {
        method: "PUT",
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
              label.textContent = "Camion Editado Correctamente";
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
          <div class="title">Editar Camion</div>
          <div class="form">
            <div class="inputfield">
              <label>Nombre:</label>
              <input
                onChange={(event) => setNombre(event.target.value)}
                type="text"
                class="input"
                id="nombrecamion"
                value={nombrecamion}
              />
            </div>
            <div class="inputfield">
              <label>Capacidad en M3:</label>
              <input
                onChange={(event) => setM3(event.target.value)}
                type="text"
                class="input"
                id="m3camion"
                value={m3camion}
              />
            </div>

            <table class="tablaform">
              <tr>
                <td>
                  <div class="inputfield" id="registro">
                    <input
                      onClick={editacamion}
                      type="submit"
                      id="botonregistro"
                      value="Editar Camion"
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

export default EditarCamion;
