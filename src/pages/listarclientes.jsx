import React, { useEffect, useState } from "react";
import "../pages/listarclientes.css";
import Header from "../common/header";
import { Link } from "react-router-dom";
import routePaths from "../routePaths";

const ListarClientes = () => {
  const getClientes = async () => {
    try {
      const response = await fetch("http://localhost:3000/Clientes/listado");
      const jsonData = await response.json();

      setClientes(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const borrarClientes = async (id) => {
    try {
      const borraClientes = await fetch(
        `http://localhost:3000/Clientes/eliminar/${id}`,
        {
          method: "DELETE",
        }
      );

      setClientes(clientes.filter((clientes) => clientes.idcliente !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getClientes();
  }, []);
  return (
    <div>
      <Header />
      <div className="wrappercenter">
        <p>
          <h2>Agregar Clientes</h2> <br></br>
        </p>
        <div class="inputfield" id="altamudanza">
          <Link to={routePaths.altacliente} className="btnalta">
            {" "}
            Nuevo{" "}
          </Link>
        </div>
      </div>
      <div className="wrappercenteralta">
        <table>
          <caption>
            <h2 className="h2alta">Listar Clientes</h2>
          </caption>
          <thead>
            <tr>
              <th>Nombre Cliente</th>
              <th>Direccion Cliente</th>
              <th>Telefono Cliente</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((clientes) => (
              <tr key={clientes.idcliente}>
                <td>{clientes.nombrecliente}</td>
                <td>{clientes.direccioncliente}</td>
                <td>{clientes.telefonocliente}</td>
                <td>
                  <button className="btnedit">
                    {/*
              La parte que sigue de link la hice de esta manera porque no logré hacer que el "routePaths.editarcliente" tomara el id. 
              De alguna manera siempre me quedaba mal armada la dirección de la pagina cuando modificaba el routepaths (/editarcliente/:id/14) 
                  */}

                    <Link to={`/editarcliente/${clientes.idcliente}`}>
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
                          "Desea eliminar el cliente: " +
                            clientes.nombrecliente +
                            " ?"
                        )
                      ) {
                        borrarClientes(clientes.idcliente);
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

export default ListarClientes;
