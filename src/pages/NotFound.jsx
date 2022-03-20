import "../pages/NotFound.css";
import routePaths from "../routePaths";
import React from "react";
import { Link } from "react-router-dom";
import HeaderMain from "../common/headermain";


const NotFound = () => {

  return (
    
    <div>
      <HeaderMain />

      <notfoundcuerpo>
      <div class="wrappercenter">
        No hay nada para mostrar en está página.
        <Link to={routePaths.NotFound} style={{ textDecoration: 'none' }}>
                      VOLVER AL LOGUEO
        </Link>
      </div>
      </notfoundcuerpo>
    </div>
  );
};

export default NotFound;
