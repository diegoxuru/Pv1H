import "../pages/login.css";
import routePaths from "../routePaths";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderMain from "../common/headermain";
import { Redirect } from "react-router-dom";
import logo from '../assets/img/control.png'

const Login = () => {
 
  const label = document.getElementById("error");
  const [mail, setEmail] = useState("mail");
  const [password, setPass] = useState("pass");
  const navigate = useNavigate();
  const loguearse = () => {
    navigate(routePaths.listarmudanza, { replace: true });
    if (mail && password) {
      const objetoBody = {
        mail: mail,
        password: password,
      };

      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objetoBody),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          //debugger;

          if (!response.error) {
            localStorage.setItem("token", response.token);
            navigate(routePaths.listarmudanza, { replace: true });
            label.textContent = "Logueo exitoso!";
            label.style.color = "#234f1e";
          } else {
           
            label.textContent = "Logueo fallido";
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
      <logincuerpo>
        <div class="wrappercenter">
        <img src={logo} width="140px" height="140px"></img>
          <div class="form">
            <div class="inputfield">
              <label>Email:</label>
              <input
                onChange={(event) => setEmail(event.target.value)}
                type="text"
                class="input"
                id="email"
              ></input>
            </div>
            <div class="inputfield">
              <label>Contraseña:</label>
              <input
                onChange={(event) => setPass(event.target.value)}
                type="password"
                class="input"
                id="password"
              ></input>
            </div>
            <br/>
            <a
              href="https://www.youtube.com/watch?v=5qap5aO4i9A"
              target="_blank"
            >
              ¿Olvidaste tu contraseña?
            </a>
            <br/> <br/>
            <table class="tablaform">
              <tr>
                <td>
                  <div class="inputfield" id="login">
                    <input
                      onClick={loguearse}
                      type="submit"
                      id="botonlogin"
                      value="Inicia Sesión"
                      class="btnlogin"
                    ></input>
                  </div>
                </td>
              </tr>
            </table>
   
            <label id="error"></label>

            <br></br>
          </div>
        </div>
      </logincuerpo>
    </div>
  );
};

export default Login;
