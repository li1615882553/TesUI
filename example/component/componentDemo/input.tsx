import { Control, Component } from "tes-work";
import Input from "@component/Input/Input";

import "./index.scss";

@Component
class InputDemo extends Control {
  value:number = 0;
  render() {
    return (
      <Input
        type="text"
        className="input"
        model="value"
        readonly
        // value={ this.value }
        // password
        onChange={this.handleChange}
      ></Input>
    )
  }
  protected componentMounted(): void {
    setTimeout(() => {
      this.value = Math.random() * 1000
    }, 1000)
  }

  handleChange(){
    console.log(this.value)
  }
}

export default InputDemo;