import { Control, Component, Watch } from "tes-work";
import Checkbox from "@component/Checkbox/Checkbox";
import CheckBoxGroup from "@component/Checkbox/CheckboxGroup";

@Component
class CheckBoxDemo extends Control {
  checkBoxChecked: Array<string> = ['true选项', 'disable选项'];

  render() {
    return (
      <div>
        <Checkbox onChange={this.handleCheckChange} trueLabel="111" falseLabel="222"> trueCheckBox </Checkbox>
        <Checkbox onChange={this.handleCheckChange}> falseCheckBox </Checkbox>
        <CheckBoxGroup model="checkBoxChecked" >
          <Checkbox onChange={this.handleCheckChange} label="true选项"></Checkbox>
          <Checkbox onChange={this.handleCheckChange} label="false选项"></Checkbox>
          <Checkbox onChange={this.handleCheckChange} label="disable选项"></Checkbox>
        </CheckBoxGroup>
      </div>
    )
  }
  @Watch("checkBoxChecked")
  handleCheck(newVal, oldVal) {
    console.log(`newVal: ${newVal}, oldVal: ${oldVal}`);
  }

  handleCheckChange(val) {
    val = true;
    console.log('checkBox 发生变化,变化后的值为', val)
  }
}

export default CheckBoxDemo;