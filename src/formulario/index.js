import React, { Component } from "react";
import CartaoPergunta from "./cartao-pergunta";
import { Redirect } from "react-router-dom";
import { GlobalStateContext } from "../context";

class Formulario extends Component {
  static contextType = GlobalStateContext;
  constructor(props) {
    super(props);
    let url = window.location.pathname.split("/");
    let linkForm = null;
    if (url.length === 3) {
      linkForm = url[2];
    }
    this.state = {
      linkForm: linkForm,
      title: "",
      questions: [
        {
          id: 0,
          title: "Nome da Postagem",
          required: true,
          components: [
            {
              id: 0,
              type: "textarea",
              text: "",
            },
          ],
        },
      ],
      questionsId: 1,
      componentsId: 1,
      selected: null,
      alert: false,
      success: false,
      selectedBoard: null,
      selectedList: null,
      boards: [],
      lists: [],
    };
    this.onAddQuestion = this.onAddQuestion.bind(this);
    this.onAddComponent = this.onAddComponent.bind(this);
    this.onRemoveQuestion = this.onRemoveQuestion.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectBoard = this.onSelectBoard.bind(this);
    this.onSelectList = this.onSelectList.bind(this);

    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeComponent = this.onChangeComponent.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeRequired = this.onChangeRequired.bind(this);

    this.onSave = this.onSave.bind(this);
    this.loadBoards = this.loadBoards.bind(this);
    this.loadLists = this.loadLists.bind(this);
    this.loadForm = this.loadForm.bind(this);
  }

  // Seleciona um novo quadro trello.
  onSelectBoard(e) {
    let selected = null;
    const selector = e.target;
    this.state.boards.map((board) => {
      if (
        board.id ===
        selector.options[selector.selectedIndex].getAttribute("data-id")
      ) {
        selected = board;
      }
    });
    this.setState({ selectedBoard: selected });
  }

  // Seleciona uma nova lista trello.
  onSelectList(e) {
    let selected = null;
    const selector = e.target;
    this.state.lists.map((list) => {
      if (
        list.id ===
        selector.options[selector.selectedIndex].getAttribute("data-id")
      ) {
        selected = list;
      }
    });
    this.setState({ selectedList: selected });
  }

  //Caso esteja sendo usado um formulário como template.
  loadForm() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      const form = JSON.parse(xhr.responseText);
      let maxQId = 0;
      let maxCId = 0;
      form.questions.map((question) => {
        question.id = maxQId;
        maxQId++;
        question.components.map((component) => {
          component.id = maxCId;
          maxQId++;
        });
      });
      this.setState({
        questions: form.questions,
        questionsId: maxQId,
        componentsId: maxCId,
      });
    });
    xhr.open(
      "get",
      process.env.REACT_APP_API +
        "users/" +
        this.context.user.id +
        "/forms/" +
        this.state.linkForm +
        "?full=true"
    );
    xhr.setRequestHeader("Authorization", this.context.user.lastToken);
    xhr.send();
  }

  // Carrega os quadros trello daquele user.
  loadBoards() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      const boards = JSON.parse(xhr.responseText);
      this.setState({
        boards: boards,
        selectedBoard: boards[0],
      });
      this.loadLists();
    });
    xhr.open("get", process.env.REACT_APP_API + "trello/boards");
    xhr.setRequestHeader("Authorization", this.context.user.lastToken);
    xhr.send();
  }

  // Carrega as listas trello daquele quadro.
  loadLists() {
    if (!this.state.selectedBoard) {
      return 1;
    }
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      const lists = JSON.parse(xhr.responseText);
      this.setState({ lists: lists, selectedList: lists[0] });
    });
    xhr.open(
      "get",
      process.env.REACT_APP_API +
        "trello/boards/" +
        this.state.selectedBoard.id +
        "/lists"
    );
    xhr.setRequestHeader("Authorization", this.context.user.lastToken);
    xhr.send();
  }

  // Salva o formulário.
  onSave() {
    if (this.state.title == "") {
      this.setState({ alert: "Coloque um título no formulário" });
      setTimeout(() => {
        this.setState({ alert: false });
      }, 2000);
      return;
    }
    const form = {
      title: this.state.title,
      idList: this.state.selectedList.id,
      questions: this.state.questions,
    };
    this.setState({ success: { waiting: true }, alert: "Aguarde..." });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 201) {
          this.setState({
            alert: "Houve um erro! Tente novamente.",
            success: false,
          });
        } else {
          this.setState({ alert: "Salvo com successo!", success: true });
        }
        setTimeout(() => {
          this.setState({ alert: false, success: { redirect: true } });
        }, 2000);
      }
    };
    xhr.open(
      "post",
      process.env.REACT_APP_API + "users/" + this.context.user.id + "/forms"
    );
    xhr.setRequestHeader("Authorization", this.context.user.lastToken);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(form));
  }

  // Modifica o título do formulário.
  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  // Seleciona uma nova questão para adicionar componentes.
  onSelect(e) {
    console.log(e.currentTarget.getAttribute("data-id"), this.state.selected);
    this.setState({
      selected: e.currentTarget.getAttribute("data-id"),
    });
  }

  // Adiciona questão ao formulário.
  onAddQuestion() {
    this.state.questions.push({
      id: this.state.questionsId,
      title: "",
      components: [],
    });
    this.setState({ questionsId: this.state.questionsId + 1 });
  }

  // Adiciona um componente a questão selecionada.
  onAddComponent(e, type) {
    if (this.state.selected && this.state.selected != 0) {
      this.state.questions.map((question) => {
        if (question.id == this.state.selected) {
          question.components.push({
            id: this.state.componentsId,
            type: type,
            text: "",
          });
        }
      });
      this.setState({ componentsId: this.state.componentsId + 1 });
    } else {
      if (this.state.selected == 0) {
        this.setState({
          alert: "Não é possível adicionar componentes a esta pergunta.",
        });
      } else {
        this.setState({ alert: "Primeiro, selecione uma pergunta." });
      }
      setTimeout(() => {
        this.setState({ alert: false });
      }, 2000);
    }
  }

  // Remove uma questão selecionada do formulário.
  onRemoveQuestion(e) {
    if (this.state.selected && this.state.selected != 0) {
      const questions = [];
      let next = null;
      this.state.questions.map((question, key) => {
        if (question.id != this.state.selected) {
          questions.push(question);
        } else if (this.state.questions[key + 1]) {
          next = this.state.questions[key + 1].id;
        }
      });
      this.setState({
        questions: questions,
        selected: next,
      });
    } else {
      if (this.state.selected == 0) {
        this.setState({ alert: "Esse campo não pode ser removido." });
      } else {
        this.setState({ alert: "Primeiro, selecione uma pergunta." });
      }
      setTimeout(() => {
        this.setState({ alert: false });
      }, 2000);
    }
  }

  // Realiza alteração no componente, caso seja necessário.
  onChangeComponent(id, text) {
    var questions = [];
    this.state.questions.map((question) => {
      question.components.map((component) => {
        if (component.id == id) {
          component.text = text;
        }
      });
      questions.push(question);
    });
    this.setState({ questions: questions });
  }

  // Modifica uma questão para obrigatória/opicional.
  onChangeRequired(e) {
    if (this.state.selected && this.state.selected != 0) {
      var questions = [];
      this.state.questions.map((question) => {
        if (question.id == this.state.selected) {
          if (!question.required) {
            question.required = true;
          } else {
            question.required = false;
          }
        }
        questions.push(question);
      });
      this.setState({ questions: questions });
    } else {
      if (this.state.selected == 0) {
        this.setState({ alert: "Esse campo deve ser obrigatório!" });
      } else {
        this.setState({ alert: "Primeiro, selecione uma pergunta." });
      }
      setTimeout(() => {
        this.setState({ alert: false });
      }, 2000);
    }
  }

  // Modifica uma questão.
  onChangeQuestion(id, title, component = null) {
    var questions = [];
    this.state.questions.map((question) => {
      if (question.id == id) {
        question.title = title;
      }
      questions.push(question);
    });
    this.setState({ questions: questions });
  }

  componentDidMount() {
    this.loadBoards();
    if (this.state.linkForm) {
      this.loadForm();
    }
  }

  componentDidUpdate() {
    if (
      this.state.selectedList &&
      this.state.selectedList.idBoard != this.state.selectedBoard.id
    ) {
      this.loadLists();
    }
  }

  render() {
    if (this.state.success.redirect) {
      return <Redirect to="/formularios"></Redirect>;
    }
    return (
      <div className="conteiner-fluid">
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="flex-center justify-center">
              <h3>Menu</h3>
            </div>
            <div className="input-group mb-3 p-2">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="trelloboard">
                  Quadro Trello:
                </label>
              </div>
              <select
                className="custom-select"
                id="trelloboard"
                onChange={this.onSelectBoard}
              >
                {this.state.boards.map((board, key) => {
                  return (
                    <option key={key} data-id={board.id}>
                      {board.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {this.state.selectedBoard ? (
              <div className="input-group mb-3 p-2">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="trellolist">
                    Lista Trello:
                  </label>
                </div>
                <select onChange={this.onSelectList} className="custom-select">
                  {this.state.lists.map((list, key) => {
                    return (
                      <option key={key} data-id={list.id}>
                        {list.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : null}
            <div className="flex-center p-2">
              <div className="flex-vertical">
                <button
                  className="flex-center justify-center"
                  onClick={this.onAddQuestion}
                >
                  <div className="w-half">Adicionar Pergunta</div>

                  <i class="far fa-plus-square ml-2"></i>
                </button>

                <button
                  className="flex-center justify-center"
                  onClick={this.onRemoveQuestion}
                >
                  <div className="w-half"> Remover Pergunta</div>
                  <i className="far fa-trash-alt ml-2"></i>
                </button>

                <button
                  className="flex-center justify-center"
                  onClick={(e) => {
                    this.onAddComponent(e, "textarea");
                  }}
                >
                  <div className="w-half"> Textarea</div>
                  <i class="fas fa-underline ml-2"></i>
                </button>
              </div>
              <div className="flex-vertical">
                <button
                  className="flex-center justify-center"
                  onClick={(e) => {
                    this.onAddComponent(e, "checkbox");
                  }}
                >
                  <div className="w-half"> Checkbox </div>

                  <i className="far fa-check-square ml-2"></i>
                </button>
                <button
                  className="flex-center justify-center"
                  onClick={(e) => {
                    this.onAddComponent(e, "radio");
                  }}
                >
                  <div className="w-half">Radiobox</div>

                  <i className="far fa-check-circle ml-2 "></i>
                </button>
                <button
                  className="flex-center justify-center"
                  onClick={(e) => {
                    this.onAddComponent(e, "date");
                  }}
                >
                  <div className="w-half"> Campo data </div>
                  <i class="far fa-calendar-alt ml-2"></i>
                </button>
              </div>
              <div className="flex-vertical">
                <button
                  className="flex-center justify-center"
                  onClick={(e) => {
                    this.onAddComponent(e, "file");
                  }}
                >
                  <div className="w-half">Carregar Arquivo</div>
                  <i class="fas fa-upload ml-2"></i>
                </button>

                <button
                  className="flex-center justify-center"
                  onClick={this.onSave}
                >
                  <div className="w-half">Salvar</div>
                  <i class="far fa-save ml-2"></i>
                </button>

                <button
                  className="flex-center justify-center"
                  onClick={this.onChangeRequired}
                >
                  <div className="w-half">Obrigatória</div>
                  <i class="fas fa-star-of-life ml-2"></i>
                </button>
              </div>
            </div>
            {this.state.alert ? (
              <div
                className={
                  this.state.success.waiting
                    ? "alert alert m-2 alert-warning"
                    : this.state.success
                    ? "alert alert m-2 alert-success"
                    : "alert alert m-2 alert-danger"
                }
              >
                {this.state.alert}
              </div>
            ) : null}
          </div>
          <div className="col-md-8">
            <div className="flex-center justify-center mb-3">
              <h3>Título: </h3>
              <input
                onChange={this.onChangeTitle}
                className="ml-3"
                style={{
                  borderWidth: "0px 0px 1px",
                  fontSize: "30px",
                  width: "50%",
                }}
              />
            </div>
            <div className="">
              {this.state.questions.map((question, key) => {
                return (
                  <CartaoPergunta
                    question={question}
                    index={key}
                    key={key}
                    onSelect={this.onSelect}
                    selected={this.state.selected == question.id}
                    onChangeQuestion={this.onChangeQuestion}
                    onChangeComponent={this.onChangeComponent}
                    question={question}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Formulario;
