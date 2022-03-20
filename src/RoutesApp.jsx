import React from 'react';
import { Routes, Route } from 'react-router-dom';

import routePaths from './routePaths';

//USUARIOS
import Login from './pages/login';
import Signin from './pages/registro';
//MUDANZAS
import AltaMudanza from './pages/altamudanza';
import ListarMudanza from './pages/listarmudanza';
import EditarMudanza from './pages/editarmudanza';
//CLIENTES
import AltaCliente from './pages/altacliente'
import EditarCliente from './pages/editarcliente';
import ListarClientes from './pages/listarclientes';
//CAMIONES
import AltaCamion from './pages/altacamion';
import ListarCamiones from './pages/listarcamiones';
import EditarCamion from './pages/editarcamion';

import { id } from 'date-fns/locale';
import NotFound from './pages/NotFound';

const RoutesApp = () => {
  return (
    <>
      <Routes>
      
        <Route path={routePaths.login} element={<Login />} />
        <Route path={routePaths.signin} element={<Signin />} />
        {/*------------------------------------------------------ */}
        <Route path={routePaths.altamudanza} element={<AltaMudanza />} />
        <Route path={routePaths.listarmudanza} element={<ListarMudanza />} />
        <Route path={routePaths.editarmudanza} params={id} element={<EditarMudanza />} />
        {/*------------------------------------------------------ */}
        <Route path={routePaths.altacliente} element={<AltaCliente />} />
        <Route path={routePaths.listarcliente} element={<ListarClientes />} />
        <Route path={routePaths.editarcliente} params={id} element={<EditarCliente />} />
        {/*------------------------------------------------------ */}
        <Route path={routePaths.altacamion} element={<AltaCamion />} />
        <Route path={routePaths.listarcamion} element={<ListarCamiones />} />
        <Route path={routePaths.editarcamion} element={<EditarCamion />}/>

        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default RoutesApp;
