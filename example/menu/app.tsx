
import { Component, Control, Watch, nextTick } from "tes-work";
import Menu from "@component/menu/Menu";
import SubMenu from "@component/menu/SubMenu";
import MenuItem from "@component/menu/MenuItem";

@Component
class Panel extends Control {
  render() {
    return (
      <div>
        <Menu defaultActive="1-1">
          <SubMenu index="1" title="导航一">
            <MenuItem index="1-1">处理中心</MenuItem>
            <MenuItem index="1-2">我的工作台</MenuItem>
          </SubMenu>
          <SubMenu index="2" title="导航二">
            <MenuItem index="1-3" disabled>消息中心</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

let panel = new Panel();
panel.$renderTo(document.querySelector("#app"))