import React, { useEffect, useState } from "react";
import "../pages/listarmudanza.css";
import Header from "../common/header";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import routePaths from "../routePaths";
import { Table } from 'react-bootstrap';
import borrar from '../assets/img/delete-48.png';
import edit from '../assets/img/edit-3-48.png';
import plus from '../assets/img/plusgreen.jpg';
import data from '../data.json'
import { faEraser, faEdit, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ListarMudanza = () => {
  const getMudanzas = () => {

      setMudanzas(data);

  };

  const borrarMudanza = async (id) => {
    try {
      const borraMudanzas = await fetch(
        `http://localhost:3000/mudanzas/eliminar/${id}`,
        {
          method: "DELETE",
        }
      );

      setMudanzas(mudanzas.filter((mudanzas) => mudanzas.idmudanza !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const [mudanzas, setMudanzas] = useState([]);

  useEffect(() => {
    getMudanzas();
  }, []);
  return (
    <div>
      <Header />
      <div className="wrappercenteralta">
        <Table striped bordered hover responsive >
          <thead>
            <tr>
              <th>Nombre Producto</th>
              <th>Forma de Medición:</th>
              <th>Precio Minimo</th>
              <th>Precio Máximo</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mudanzas.map((mudanzas) => (
              <tr key={mudanzas.idproducto}>
                <td>{mudanzas.nombreproducto}</td>
                <td>{mudanzas.unidad}</td>
                <td>{mudanzas.topeminimo}</td>
                <td>{mudanzas.topemaximo}</td>
                <td>
                  <button  class="boton">
                    {/*
              La parte que sigue de link la hice de esta manera porque no logré hacer que el "routePaths.editarmudanza" tomara el id. 
              De alguna manera siempre me quedaba mal armada la dirección de la pagina cuando modificaba el routepaths (/editarmudanza/:id/14) 
                  */}

                    <Link to={`/editarproductos/${mudanzas.idproducto}`} style={{ textDecoration: 'none' }}>
                    <FontAwesomeIcon size="2x" icon={ faEdit }/>
                    </Link>
                  </button>
                </td>
                <td>
                  <button
                    class="boton"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Desea eliminar el Producto de nombre: " +

                            mudanzas.nombreproducto +
                            " ?"
                        )
                      ) {
                        borrarMudanza(mudanzas.idmudanza);
                      }
                    }}
                  >
                    <FontAwesomeIcon size="2x" icon={ faEraser }/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to={routePaths.altamudanza}>
            {" "}
            <FontAwesomeIcon size="3x" icon={ faCirclePlus }/>{" "}
          </Link>
      </div>
    </div>
  );
};

export default ListarMudanza;
