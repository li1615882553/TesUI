import { Control, Component } from "tes-work";
import Radio from "@component/Radio/Radio";
import RadioGroup from "@component/Radio/RadioGroup";

import "./index.scss"; 

@Component
class RadioDemo extends Control {
  radio: string = "2";
  render() {
    return (
      <div>
        <Radio model="radio" label="1" onChange={this.radioChange} >备选项1</Radio>
        <Radio model="radio" label="2" onChange={this.radioChange}>备选项2</Radio>
        <RadioGroup model="radio" onChange={this.radioChange} >
          <Radio label="1">选项1</Radio>
          <Radio label="2">选项2</Radio>
        </RadioGroup>
      </div>
    )
  }

  radioChange(value) {
    console.log(value, this.radio)
  }
}

export default RadioDemo;