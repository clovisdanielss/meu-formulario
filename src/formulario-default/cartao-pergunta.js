import React, { Component } from "react";
import CustomInput from "./custom-input";

class CartaoPergunta extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="question-text-div">
          <h4>
            {this.props.question.title}{" "}
            <span style={{ color: "red" }}>
              {this.props.question.required ? "*" : ""}
            </span>
          </h4>
        </div>
        <div>
          {this.props.question.components.map((item, key) => {
            return (
              <CustomInput
                key={key}
                component={item}
                onChangeAnswer={this.props.onChangeAnswer}
                idQuestion={this.props.question.id}
                titleQuestion={this.props.question.title}
                onRemoveFiles={this.props.onRemoveFiles}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default CartaoPergunta;
