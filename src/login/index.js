import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  // Método para autenticação
  onLogin(e) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      const { url } = JSON.parse(xhr.responseText);
      window.location.replace(url);
    });
    xhr.open("GET", process.env.REACT_APP_API + "login");
    xhr.send();
  }

  render() {
    return (
      <div id="login">
        <button type="button" onClick={this.onLogin} className="flex-center justify-center mt-5">
            Entrar com Trello
            <i
              class="fab fa-trello ml-3"
              style={{
                fontSize: "30px",
              }}
            ></i>
        </button>
      </div>
    );
  }
}

export default Login;
