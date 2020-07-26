import React, { Component } from "react";
import Datetime from "react-datetime-picker";

class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
  }

  onChange(e) {
    const idQuestion = this.props.idQuestion;
    const type = this.props.component.type;
    const value = type === "date" ? e : e.target.value;
    const checked = e.target ? e.target.checked : e;
    var answer = {
      checked: checked,
      idQuestion: idQuestion,
      value: value,
      idComponent: this.props.component.id,
      titleQuestion: this.props.titleQuestion,
      type: type,
    };
    if (type === "date") {
      this.setState({ date: value });
    }
    this.props.onChangeAnswer(answer);
  }

  onChangeFile(e) {
    const props = this.props;
    this.props.onRemoveFiles(props.idComponent);
    Array.from(e.target.files).map((file) => {
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const buffer = Buffer.from(e.target.result).toJSON().data;
        var answer = {
          idQuestion: props.idQuestion,
          value: { data: buffer, name: file.name, mimeType: file.type },
          idComponent: props.component.id,
          titleQuestion: props.titleQuestion,
          type: props.component.type,
        };
        props.onChangeAnswer(answer);
      };
    });
  }

  render() {
    if (this.props) {
      const type = this.props.component.type;
      const text = this.props.component.text;
      const id = this.props.component.id;
      if (type === "textarea") {
        return (
          <div className="mb-2">
            <textarea
              data-id={id}
              onChange={this.onChange}
              className="form-control"
            />
          </div>
        );
      } else if (type === "file") {
        return (
          <div className="mb-2">
            <input
              multiple
              data-id={id}
              type={type}
              className="input-text"
              onChange={this.onChangeFile}
            />
          </div>
        );
      } else if (this.props.component.type === "date") {
        return (
          <div className="datetime mb-2">
            <Datetime
              minDate={new Date()}
              disableClock
              hourPlaceholder="Up/Dn"
              value={this.state.date}
              data-id={id}
              type={type}
              className="input-text"
              onChange={this.onChange}
            />
          </div>
        );
      } else {
        return (
          <div className="mb-2 input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input
                  data-id={id}
                  value={text}
                  type={type}
                  name={"question" + this.props.idQuestion}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-control">
              <label>{text}</label>
            </div>
          </div>
        );
      }
    }
  }
}

export default CustomInput;
