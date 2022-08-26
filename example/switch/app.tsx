
import { Component, Control, Watch, nextTick } from "tes-work";
import Switch from "@component/switch/switch";

@Component
class Panel extends Control {
  public done: boolean = true;
  handleChange(){
    nextTick(() => {
      console.log(this.done)
    })
  }

  render() {
    return (
      <div>
        <Switch disabled model="done" onChange={this.handleChange} inactiveTest="取消" activeText="选中"></Switch>
      </div>
    )
  }
}

let panel = new Panel();
panel.$renderTo(document.querySelector("#app"))