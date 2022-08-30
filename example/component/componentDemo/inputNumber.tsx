import { Control, Component } from "tes-work";
import InputNumber from "@component/InputNumber/InputNumber";

import "./index.scss";

@Component
class InpuNumbertDemo extends Control {
  value:number = 10;
  render() {
    return (
      <InputNumber model="value" step={1} max={10} min={0} precision={2} stepStrictly placeholder="1234"></InputNumber>
    )
  }
}

export default InpuNumbertDemo;