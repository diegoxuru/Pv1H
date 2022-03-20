import React, { useState } from "react";
import "../pages/registro.css";
import routePaths from "../routePaths";

import { Link } from "react-router-dom";
import HeaderMain from "../common/headermain";

const Signin = () => {
  const label = document.getElementById("error");
  const [mail, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [cel, setCel] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [addrs, setAddrs] = useState("");

  const registrarse = () => {
    if (mail && password && cel && addrs && name && lastname) {
      const objetoBody = {
        name: name,
        lastname: lastname,
        addrs: addrs,
        cel: cel,
        mail: mail,
        password: password,
      };
      console.log(objetoBody);
      fetch("http://localhost:3000/auth/registro", {
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
          debugger;

          if (!response.error) {
            label.textContent = response.message;
            label.style.color = "#FF0000";
            if (response.success) {
              label.textContent = "Usuario Creado Correctamente";
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
      <HeaderMain />
      <registrocuerpo>
        <div class="wrappercenter">
          <div class="title">Registrate</div>
          <div class="form">
            <div class="inputfield">
              <label>Email:</label>
              <input
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                class="input"
                id="mail"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
            </div>
            <div class="inputfield">
              <label>Contraseña:</label>
              <input
                onChange={(event) => setPass(event.target.value)}
                type="password"
                class="input"
                id="password"
              />
            </div>
            <div class="inputfield">
              <label>Nombre:</label>
              <input
                onChange={(event) => setName(event.target.value)}
                type="text"
                class="input"
                id="name"
              />
            </div>
            <div class="inputfield">
              <label>Apellido:</label>
              <input
                onChange={(event) => setLastName(event.target.value)}
                type="text"
                class="input"
                id="lastname"
              />
            </div>
            <div class="inputfield">
              <label>Direccion:</label>
              <input
                onChange={(event) => setAddrs(event.target.value)}
                type="text"
                class="input"
                id="addrs"
              />
            </div>
            <div class="inputfield">
              <label>Celular:</label>
              <input
                onChange={(event) => setCel(event.target.value)}
                type="text"
                class="input"
                id="cel"
              />
            </div>
            <table class="tablaform">
              <tr>
                <td>
                  <div class="inputfield" id="registro">
                    <input
                      onClick={registrarse}
                      type="submit"
                      id="botonregistro"
                      value="Registrate"
                      class="btnlogin"
                    />
                  </div>
                </td>
                <td>
                  <div class="inputfield" id="plan">
                    <Link to={routePaths.login} className="btnchooseplan">
                      {" "}
                      Volver al Index{" "}
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

export default Signin;
