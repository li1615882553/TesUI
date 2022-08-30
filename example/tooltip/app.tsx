
import { Component, Control, Watch, nextTick } from "tes-work";
import ToolTip from "@component/Tooltip/Tooltip";
import Button from "@component/Button";

@Component
class Panel extends Control {
  public done: boolean = true;
  handleChange() {
    nextTick(() => {
      console.log(this.done)
    })
  }

  render() {
    return (
      <div>
        <ToolTip content="点击关闭 tooltip 功能" effect="light" style="border:1px solid #00ff00;" disabled>
          <Button>这是一个包在tooltip中的button</Button>
        </ToolTip>
      </div>
    )
  }
}

let panel = new Panel();
panel.$renderTo(document.querySelector("#app"))