import React, { Component } from "react";
import CustomInput from "./custom-input";

class CartaoPergunta extends Component {
  constructor(props) {
    super(props);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
  }

  onChangeQuestion(e) {
    this.props.onChangeQuestion(this.props.question.id, e.target.value);
  }

  componentWillReceiveProps(props) {
    document.getElementById("question" + this.props.question.id).value =
      props.question.title;
  }

  render() {
    return (
      <div
        id={this.props.question.id}
        className={this.props.selected ? "selected rounded-lg" : "rounded-lg"}
        onClick={this.props.onSelect}
        data-id={this.props.question.id}
      >
        <div className="p-2">
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                htmlFor={"question" + this.props.question.id}
              >
                Questão {1 + this.props.index}
                <span style={{ color: "red" }}>
                  {this.props.question.required ? "*" : null}
                </span>
              </span>
            </div>

            <input
              readOnly={this.props.question.id === 0}
              className="form-control"
              id={"question" + this.props.question.id}
              type="text"
              onChange={this.onChangeQuestion}
            />
          </div>
          <div>
            {this.props.question.components.map((component, key) => {
              return (
                <div className="question-component-div" key={key}>
                  <CustomInput
                    component={component}
                    idQuestion={this.props.question.id}
                    onChangeComponent={this.props.onChangeComponent}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default CartaoPergunta;
