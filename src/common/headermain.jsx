import React from 'react';
import './headermain.css';
import logo from '../assets/img/controllogo.png'

const HeaderMain = () => {
    return (
        <header className="headermain">
          <img className="logo" src={logo} width="auto" height="auto" />
          <nav className="navindex">

          </nav>
        </header>
    );
  }

  export default HeaderMain;