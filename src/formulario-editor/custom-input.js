import React, { Component } from "react";
import Datetime from "react-datetime-picker";

class CustomInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (this.props.component.type === "date") {
      const value = e;
      this.props.onChangeComponent(this.props.component.id, e);
      this.setState({ date: value });
    } else if (this.props.component.type !== "file") {
      this.props.onChangeComponent(this.props.component.id, e.target.value);
    } else {
      this.props.onChangeComponent(this.props.component.id, e.target.files[0]);
    }
  }

  componentWillReceiveProps(props) {
    document.getElementById("component" + this.props.component.id).value =
      props.component.text;
  }

  render() {
    if (this.props.component.type === "textarea") {
      return (
        <div data-id={this.props.component.id}>
          <textarea
            id={"component" + this.props.component.id}
            data-id={this.props.component.id}
            className="form-control"
            placeholder="Aqui é onde o usuário vai preencher a resposta."
            readOnly
          />
        </div>
      );
    } else if (this.props.component.type === "file") {
      return (
        <div className="mb-2">
          <input
            id={"component" + this.props.component.id}
            className="input-text"
            data-id={this.props.component.id}
            type={this.props.component.type}
            readOnly
            accept="image/*"
          />
        </div>
      );
    } else if (this.props.component.type === "date") {
      return (
        <div id={"component" + this.props.component.id} className="mb-2">
          <Datetime
            minDate={new Date()}
            disableClock
            hourPlaceholder="Setas para editar horas"
            value={this.state.date}
            data-id={this.props.component.id}
            type={this.props.component.type}
            className="input-text"
            onChange={this.onChange}
          />
        </div>
      );
    } else {
      return (
        <div data-id={this.props.component.id} className="input-group mb-2">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input
                data-id={this.props.component.id}
                type={this.props.component.type}
                name={"question" + this.props.idQuestion}
              />
            </div>
          </div>
          <input
            value={this.props.component.text}
            id={"component" + this.props.component.id}
            className="form-control"
            type="text"
            onChange={this.onChange}
          />
        </div>
      );
    }
  }
}

export default CustomInput;
