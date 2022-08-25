import { Control, Component } from "tes-work";
import InputDemo from "./componentDemo/input";
import SelectDemo from "./componentDemo/select";
import TagDemo from "./componentDemo/tag";
import InpuNumbertDemo from "./componentDemo/inputNumber";
import RadioDemo from "./componentDemo/radio";
import CheckBoxDemo from "./componentDemo/checkbox";

@Component
class App extends Control {
  render() {
    return (
      <div class="body-conatiner">
        <div className="nav-container">
        </div>
        <div className="body-container">
          <div className="body-component">
            <InputDemo></InputDemo>
            <SelectDemo></SelectDemo>
            <TagDemo></TagDemo>
            <InpuNumbertDemo></InpuNumbertDemo>
            <RadioDemo></RadioDemo>
            <CheckBoxDemo></CheckBoxDemo>
          </div>
        </div>
      </div>
    )
  }
}

new App().$renderTo(document.querySelector("#app"))