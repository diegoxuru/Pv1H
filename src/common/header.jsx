import React from 'react';
import './header.css';
import logo from '../assets/img/controllogo.png'
import routePaths from '../routePaths';
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <header>
          <img className="logo" src={logo} width="auto" height="auto" />
          <nav className="navindex">
            <ul className="ulindex">
              <li className="liindex" >
              <Link to={routePaths.listarmudanza}>
                    {" "}
                    Productos
                    {" "}
                  </Link>
              
              
              </li>
              <li className="liindex">
              <Link to={routePaths.listarmudanza}>
                    {" "}
                    Compras
                    {" "}
                  </Link>
              </li>
              <li className="liindex">
              <Link to={routePaths.listarmudanza}>
                    {" "}
                    Usuarios
                    {" "}
                  </Link>
                
              </li>
            </ul>
          </nav>
        </header>
    );
  }

  export default Header;