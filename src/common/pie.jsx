import React from 'react';
import './pie.css';
import face from '../assets/img/Black-icon-facebook-logo-PNG.png';
import insta from '../assets/img/Instagram-black-and-white-logo-Premium-vector-PNG-.png'
import wsp from '../assets/img/Black-and-white-Whatsapp-logo-vector-PNG.png'

const Pie = () => {
    return (
        <footercuerpo>
        <p class="FooterParrafo">
         <img src={wsp} width="50px" height="50px"></img>
        <img src={face} width="50px" height="50px"></img>
        <img src={insta} width="50px" height="50px"></img><br></br>
        Montevideo, Uruguay - 2021</p>
         </footercuerpo>
    );
  }

  export default Pie;