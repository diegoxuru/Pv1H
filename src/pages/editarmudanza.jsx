import React, { useEffect, useState } from "react";
import "../pages/editarmudanza.css";
import routePaths from "../routePaths";

import { Link } from "react-router-dom";
import Header from "../common/header";
import { format, parseISO } from "date-fns";
import { useParams } from "react-router";

const EditarMudanza = () => {
  let { id } = useParams();




  const getMudanza = async () => {
    //e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/mudanzas/buscarporid/${id}`
      );
      const jsonData = await response.json();

      setCliente(jsonData[0].idcliente);
      setCamion(jsonData[0].idcamion);
      setFechaMudanza(format(parseISO(jsonData[0].fechamudanza), "dd/MM/yyyy"));
      setDestinoMudanza(jsonData[0].destinomudanza);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getCamiones = async () => {
    //e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/Camiones/Unidades`);
      const jsonData = await response.json();

      setCamiones(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getClientes = async () => {
    //e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/Clientes/Listado`);
      const jsonData = await response.json();

      setClientes(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMudanza();
    getCamiones();
    getClientes();
  }, []);

  const [listadocamiones, setCamiones] = useState([]);
  const [listadoclientes, setClientes] = useState([]);
  const [idcliente, setCliente] = useState("");
  const [idcamion, setCamion] = useState("");

  const [fechamudanza, setFechaMudanza] = useState("");
  const [destinomudanza, setDestinoMudanza] = useState("");
  const label = document.getElementById("error");

  const editamudanza = () => {
    if (idcliente && idcamion && fechamudanza && destinomudanza) {
      const objetoBody = {
        idmudanza: id,
        idcliente: idcliente,
        idcamion: idcamion,
        fechamudanza: fechamudanza,
        destinomudanza: destinomudanza,
      };

      fetch("http://localhost:3000/mudanzas/editar", {
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
              label.textContent = "Mudanza Editada Correctamente";
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
          <div class="title">Editar Producto</div>
          <div class="form">
          <div class="inputfield">
              <label>Nombre de Producto:</label>
              <input
                onChange={(event) => setFechaMudanza(event.target.value)}
                type="text"
                class="input"
                id="fechamudanza"
                value={fechamudanza}
              />
            </div>
            <div class="inputfield">
              <label>Forma de Medición:</label>
              <select>
              <option value="K">K</option>
		<option value="L">L</option>
		<option value="Unidad">Unidad</option>
              </select>
              {/*  
            <input
              onChange={(event) => setCliente(event.target.value)}
              type="text"
              class="input"
              id="idcliente"
             value={idcliente}
            />*/}
            </div>

            <div class="inputfield">
              <label>Precio Mínimo:</label>
              <input
                onChange={(event) => setFechaMudanza(event.target.value)}
                type="text"
                class="input"
                id="fechamudanza"
                value={fechamudanza}
              />
            </div>
            <div class="inputfield">
              <label>Precio Máximo:</label>
              <input
                onChange={(event) => setDestinoMudanza(event.target.value)}
                type="text"
                class="input"
                id="destinomudanza"
                value={destinomudanza}
              />
            </div>
            <table class="tablaform">
              <tr>
                <td>
                  <div class="inputfield" id="registro">
                    <input
                      onClick={editamudanza}
                      type="submit"
                      id="botonregistro"
                      value="Editar Producto"
                      class="btnlogin"
                    />
                  </div>
                </td>
                <td>
                  <div class="inputfield" id="plan">
                    <Link
                      to={routePaths.listarmudanza}
                      className="btnchooseplan"
                    >
                      {" "}
                      Volver al Listado de Productos{" "}
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

export default EditarMudanza;
