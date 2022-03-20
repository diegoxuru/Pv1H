import React, { useEffect, useState } from "react";
import "../pages/editarcliente.css";
import routePaths from "../routePaths";

import { Link } from "react-router-dom";
import Header from "../common/header";
import { useParams } from "react-router";

const EditarCliente = () => {
  let { id } = useParams();

  const getClientes = async () => {
    //e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/Clientes/buscarporid/${id}`
      );
      const jsonData = await response.json();

      setNombre(jsonData[0].nombrecliente);
      setTelefono(jsonData[0].telefonocliente);
      setDireccion(jsonData[0].direccioncliente);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  const [nombrecliente, setNombre] = useState("");
  const [telefonocliente, setTelefono] = useState("");
  const [direccioncliente, setDireccion] = useState("");
  const label = document.getElementById("error");

  const editacliente = () => {
    if (nombrecliente && telefonocliente && direccioncliente) {
      const objetoBody = {
        nombrecliente: nombrecliente,
        telefonocliente: telefonocliente,
        direccioncliente: direccioncliente,
      };

      fetch("http://localhost:3000/Clientes/editar", {
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
              label.textContent = "Cliente Editado Correctamente";
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
          <div class="title">Editar Cliente</div>
          <div class="form">
            <div class="inputfield">
              <label>Nombre:</label>
              <input
                onChange={(event) => setNombre(event.target.value)}
                type="text"
                class="input"
                id="nombrecliente"
                value={nombrecliente}
              />
            </div>
            <div class="inputfield">
              <label>Direccion:</label>
              <input
                onChange={(event) => setDireccion(event.target.value)}
                type="text"
                class="direccioncliente"
                value={direccioncliente}
              />
            </div>
            <div class="inputfield">
              <label>Telefono:</label>
              <input
                onChange={(event) => setTelefono(event.target.value)}
                type="text"
                class="input"
                id="telefonocliente"
                value={telefonocliente}
              />
            </div>
            <table class="tablaform">
              <tr>
                <td>
                  <div class="inputfield" id="registro">
                    <input
                      onClick={editacliente}
                      type="submit"
                      id="botonregistro"
                      value="Editar Cliente"
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

export default EditarCliente;
