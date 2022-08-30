
import { Component, Control, Watch, nextTick } from "tes-work";
import Menu from "@component/menu/Menu";
import SubMenu from "@component/menu/SubMenu";
import MenuItem from "@component/menu/MenuItem";
import MenuItemGroup from "@component/menu/MenuItemGroup";

import Row from "@component/grid/row";
import Col from "@component/grid/col";

@Component
class Panel extends Control {
  handleSelect(index) {
    console.log(index)
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={4}>
            {/* <Menu ref={this.addRefs("menu")} defaultActive="1-1" onSelect={this.handleSelect}>
              <SubMenu index="1" title="导航一">
                <MenuItemGroup title="分组一">
                  <MenuItem index="1-1">处理中心</MenuItem>
                  <MenuItem index="1-2"><i className="iconfont icon-loading"></i> 我的工作台</MenuItem>
                </MenuItemGroup>
                <SubMenu index="1-3" title={<span><i className="iconfont icon-add"></i>关于</span>}>
                  <MenuItem index="1-3-1">我的</MenuItem>
                  <MenuItem index="1-3-2">历史记录</MenuItem>
                </SubMenu>
              </SubMenu>
              <SubMenu index="2" title="导航二">
                <MenuItem index="1-3" disabled>消息中心</MenuItem>
              </SubMenu>
            </Menu> */}
          </Col>
          <Col span={8}>
            <Menu mode="horizontal" onSelect={this.handleSelect}>
              <SubMenu index="1" title="导航一">
                <MenuItemGroup title="分组一">
                  <MenuItem index="1-1">处理中心</MenuItem>
                  <MenuItem index="1-2"><i className="iconfont icon-loading"></i> 我的工作台</MenuItem>
                </MenuItemGroup>
                <SubMenu index="1-3" title={<span><i className="iconfont icon-add"></i>关于</span>}>
                  <MenuItem index="1-3-1">我的</MenuItem>
                  <MenuItem index="1-3-2">历史记录</MenuItem>
                </SubMenu>
              </SubMenu>
              <SubMenu index="2" title="导航二">
                <MenuItem index="1-3">消息中心</MenuItem>
              </SubMenu>
            </Menu>
          </Col>
        </Row>
      </div>
    )
  }
}

let panel = new Panel();
panel.$renderTo(document.querySelector("#app"))