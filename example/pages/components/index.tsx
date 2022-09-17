
import { Control, Component, VNode } from "tes-work";
import { Menu } from '@component/index';
import { dispatchRouter, Route, Router } from "../../components/Router/index";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;

const Routers = [
  { path: '#components/button', menu: 'button', component: () => import (/* webpackChunkName: "ui-Button" */"./Button/index") },
  { path: '#components/grid', menu: 'grid', component: () => import (/* webpackChunkName: "ui-Grid" */"./Grid/index") },
  { path: '#components/input', menu: 'input', component: () => import (/* webpackChunkName: "ui-Input" */"./Input/index") },
  { path: '#components/inputnumber', menu: 'inputnumber', component: () => import (/* webpackChunkName: "ui-InputNumber" */"./InputNumber/index") },
  { path: '#components/select', menu: 'select', component: () => import (/* webpackChunkName: "ui-Select" */"./Select/index") },
  { path: '#components/switch', menu: 'switch', component: () => import (/* webpackChunkName: "ui-Switch" */"./Switch/index") },
  { path: '#components/radio', menu: 'radio', component: () => import (/* webpackChunkName: "ui-Radio" */"./Radio/index") },
  { path: '#components/checkbox', menu: 'checkbox', component: () => import (/* webpackChunkName: "ui-Checkbox" */"./Checkbox/index") },
  { path: '#components/tag', menu: 'tag', component: () => import (/* webpackChunkName: "ui-Tag" */"./Tag/index") },
  { path: '#components/menu', menu: 'menu', component:() => import (/* webpackChunkName: "ui-Menu" */"./Menu/index") },
  { path: '#components/tooltip', menu: 'tooltip', component: () => import (/* webpackChunkName: "ui-Tooltip" */"./Tooltip/index") },
  { path: '#components/collapse', menu: 'collapse', component: () => import (/* webpackChunkName: "ui-Tooltip" */"./Collapse/index") },
];

const menuObj = [
  {
    name: 'Basic', index: 'BasicItemGroup', children: [
      { index: "Grid", name: "Grid(栅栏)" },
      { index: "Button", name: "Button(按钮)" }
    ]
  },
  {
    name: "Form", index: "FormItemGroup", children: [
      { index: "Input", name: "Input（输入框）" },
      { index: "InputNumber", name: "InputNumber(计数器)" },
      { index: "Select", name: "Select(选择器)" },
      { index: "Switch", name: "Switch(开关)" },
      { index: "Radio", name: "Radio(单选框)" },
      { index: "CheckBox", name: "CheckBox(多选框)" }
    ]
  },
  {
    name: "Data", index: "DataItemGroup", children: [
      { index: "Tag", name: "Tag(标签)" }
    ]
  },
  {
    name: "Navigation", index: "NavigationItemGroup", children: [
      { index: "Menu", name: "Menu(菜单)" }
    ]
  },
  {
    name: "Others", index: "OthersItemGroup", children: [
      { index: "Tooltip", name: "Tooltip(文字提示)" },
      { index: "Collapse", name: "Collapse(折叠面板)" }
    ]
  }
];

@Component
export default class Components extends Control {
  handleSelect(index: string) {
    const menuIndex = Routers.find(item => item.menu === index.toLowerCase());
    if (menuIndex) {
      dispatchRouter({ path: menuIndex.path })
    }
  }

  render() {
    return (
      <div className="TesUI-wrapper">
        <div className="wrapper-menu">
          <Menu onSelect={this.handleSelect} >
            <MenuItem index='install' >安装</MenuItem>
            <MenuItem index='start' >快速开始</MenuItem>
            <MenuItem index='logs' >更新日志</MenuItem>
            <SubMenu title='组件' index='components'>
              {
                menuObj.map((menu) => {
                  return (
                    <MenuItemGroup title={menu.name} id={menu.index}>
                      {
                        menu.children.map((item) => {
                          console.log(item.name)
                          return (
                            <MenuItem
                              index={item.index}
                            >
                              {item.name}
                            </MenuItem>
                          );
                        })
                      }
                    </MenuItemGroup>
                  );
                })
              }
            </SubMenu>
          </Menu>
        </div>
        <div className={`wrapper-container`}>
          <Router>
            {
              Routers.map((item) => {
                return (
                  <Route path={item.path} component={item.component} />
                );
              })
            }
          </Router>
        </div>
      </div>
    );
  }
}
