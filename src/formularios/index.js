import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GlobalStateContext } from "../context";
class Formularios extends Component {
  static contextType = GlobalStateContext;

  constructor(props) {
    super(props);
    this.state = {
      itemSelected: null,
      forms: [],
    };

    this.onSelect = this.onSelect.bind(this);
    this.onEditPath = this.onEditPath.bind(this);
    this.onEmptySelection = this.onEmptySelection.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.loadForms = this.loadForms.bind(this);
  }

  onSelect(e) {
    this.setState({
      itemSelected: e.currentTarget.getAttribute("data-id"),
    });
  }

  onRemove(e) {
    this.onEmptySelection();
    var id = this.state.itemSelected;
    var xhr = new XMLHttpRequest();
    const forms = [];
    this.state.forms.map((form) => {
      if (form.id != id) {
        forms.push(form);
      }
    });
    this.setState({ forms: forms, itemSelected: null });
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status === 204) {
          console.log("Removido com sucesso!");
        } else {
          console.log("Falha em remover!");
        }
      }
    };
    xhr.open(
      "delete",
      process.env.REACT_APP_API +
        "users/" +
        this.context.user.id +
        "/forms/" +
        id
    );
    xhr.setRequestHeader("Authorization", this.context.user.lastToken);
    xhr.send();
  }

  onEditPath(e) {
    if (this.state.itemSelected) {
      let link = document
        .getElementById(this.state.itemSelected)
        .getAttribute("data-link");
      return "/formulario/" + link;
    } else {
      return "/formularios";
    }
  }

  onEmptySelection() {
    if (!this.state.itemSelected) {
      alert("Selecione um item para realizar esta ação.");
    }
  }

  loadForms() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      const forms = JSON.parse(xhr.responseText);
      this.setState({ forms: forms });
    });
    xhr.open(
      "get",
      process.env.REACT_APP_API + "users/" + this.context.user.id + "/forms"
    );
    xhr.setRequestHeader("Authorization", this.context.user.lastToken);
    xhr.send();
  }

  componentDidMount() {
    this.loadForms();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md">
            <div className="table-button">
              <Link to="/formulario">
                <button className="flex-center justify-center">
                  Criar
                  <i className="far fa-plus-square ml-2"></i>
                </button>
              </Link>
            </div>
            {this.state.itemSelected
              ? [
                  <div className="table-button" key={0}>
                    <Link to={this.onEditPath}>
                      <button className="flex-center justify-center">
                        Copiar
                        <i className="far fa-copy ml-2"></i>
                      </button>
                    </Link>
                  </div>,
                  <div className="table-button" key={1}>
                    <Link onClick={this.onRemove} to="/formularios">
                      <button className="flex-center justify-center">
                        Remover
                        <i className="far fa-trash-alt ml-2"></i>
                      </button>
                    </Link>
                  </div>,
                ]
              : null}

            <div className="table-button">
              <button
                onClick={this.loadForms}
                className="flex-center justify-center"
              >
                Atualizar
                <i className="fas fa-sync-alt ml-2"></i>
              </button>
            </div>
          </div>
          <div className="flex-center col-md justify-end">
            <label className="mr-3"> Busca: </label>
            <input type="text" />
          </div>
        </div>
        <div className="table-div">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Título:</th>
                <th scope="col">Link:</th>
              </tr>
            </thead>
            <tbody>
              {this.state.forms.map((item, key) => {
                return (
                  <tr
                    key={key}
                    className={
                      this.state.itemSelected
                        ? item.id.toString() ===
                          this.state.itemSelected.toString()
                          ? "selected"
                          : ""
                        : ""
                    }
                    id={item.id}
                    data-id={item.id}
                    data-link={item.link}
                    onClick={this.onSelect}
                  >
                    <td>{item.title}</td>
                    <td>
                      <Link to={"/formulario/" + item.link + "/responder"}>
                        {item.link}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Formularios;
