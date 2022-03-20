import React, { useEffect, useState } from "react";
import "../pages/listarcamiones.css";
import Header from "../common/header";
import { Link } from "react-router-dom";
import routePaths from "../routePaths";

const ListarCamiones = () => {
  const getCamiones = async () => {
    try {
      const response = await fetch("http://localhost:3000/Camiones/Unidades");
      const jsonData = await response.json();

      setCamiones(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const borrarCamiones = async (id) => {
    try {
      const borrarCamiones = await fetch(
        `http://localhost:3000/Camiones/eliminar/${id}`,
        {
          method: "DELETE",
        }
      );

      setCamiones(camiones.filter((camiones) => camiones.idcamion !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const [camiones, setCamiones] = useState([]);

  useEffect(() => {
    getCamiones();
  }, []);
  return (
    <div>
      <Header />
      <div className="wrappercenter">
        <p>
          <h2>Agregar Camiones</h2> <br></br>
        </p>
        <div class="inputfield" id="altamudanza">
          <Link to={routePaths.altacamion} className="btnalta">
            {" "}
            Nuevo{" "}
          </Link>
        </div>
      </div>
      <div className="wrappercenteralta">
        <table>
          <caption>
            <h2 className="h2alta">Listar Camiones</h2>
          </caption>
          <thead>
            <tr>
              <th>Nombre Camion</th>
              <th>M3 Camion</th>

              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {camiones.map((camiones) => (
              <tr key={camiones.idcamion}>
                <td>{camiones.nombrecamion}</td>
                <td>{camiones.m3camion}</td>
                <td>
                  <button className="btnedit">
                    {/*
              La parte que sigue de link la hice de esta manera porque no logré hacer que el "routePaths.editarcamion" tomara el id. 
              De alguna manera siempre me quedaba mal armada la dirección de la pagina cuando modificaba el routepaths (/editarcamion/:id/14) 
                  */}

                    <Link to={`/editarcamion/${camiones.idcamion}`}>
                      EDITAR
                    </Link>
                  </button>
                </td>
                <td>
                  <button
                    className="btnbaja"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Desea eliminar el Camion: " +
                            camiones.nombrecamion +
                            " ?"
                        )
                      ) {
                        borrarCamiones(camiones.idcamion);
                      }
                    }}
                  >
                    ELIMINAR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarCamiones;
