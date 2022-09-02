
import { Control, Component, VNode } from "tes-work";
import { Menu } from '@component/index';
import { dispatchRouter, Route, Router } from "../../components/Router/index";
import Button from "./Button/index";
import Grid from "./Grid/index";
import Switch from "./Switch/index";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;

const Routers = [
  { path: '#components/button', menu: 'button', component: <Button /> },
  { path: '#components/grid', menu: 'grid', component: <Grid /> },
  { path: '#components/input', menu: 'input', component: <Button /> },
  { path: '#components/inputnumber', menu: 'inputnumber', component: <Button /> },
  { path: '#components/select', menu: 'select', component: <Button /> },
  { path: '#components/switch', menu: 'switch', component: <Switch /> },
  { path: '#components/radio', menu: 'radio', component: <Button /> },
  { path: '#components/checkbox', menu: 'checkbox', component: <Button /> },
  { path: '#components/tag', menu: 'tag', component: <Button /> },
  { path: '#components/menu', menu: 'menu', component: <Button /> },
  { path: '#components/tooltip', menu: 'tooltip', component: <Button /> },

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
      { index: "Input", name: "Input(输入框)" },
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
      { index: "Tooltip", name: "Tooltip(文字提示)" }
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
      <div>
        <div className="wrapper-menu">
          <Menu onSelect={this.handleSelect}>
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
            <MainLayout>
              {
                Routers.map((item) => {
                  return (
                    <Route path={item.path} component={item.component} />
                  );
                })
              }
            </MainLayout>
          </Router>
        </div>
      </div>
    );
  }
}


@Component
class MainLayout extends Control {
  protected render(): void {
    return (
      <div>
        {this.$children}
      </div>
    )
  }
}