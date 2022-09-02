import { Control, Component, VNode } from "tes-work";
import { Menu } from '@component/index';
import { Route, Router, dispatchRouter } from "../components/Router"
import Components from "./components/index";

import "./index.scss";

const Routers = [
  { path: '#components', menu: 'components', component: <Components /> }
];

@Component
export default class TesUI extends Control {
  handleSelect(index){
    dispatchRouter({ path: index })
  }
  render() {
    return (
      <div>
        <div className="TesUI-header">
          <div className="TesUI-logo">
            TesUI
          </div>
          <Menu mode='horizontal' className="TesUI-nav-menu" onSelect={ this.handleSelect }  defaultActive="components">
            <Menu.Item index='components'>组件</Menu.Item>
          </Menu>
        </div>
        <div className="TesUI-wrapper">
          <Router>
            {Routers && Routers.map((item) => (<Route path={item.path} component={item.component} />))}
          </Router>
        </div>
        <div className="TesUI-footer" />
      </div>
    );
  }
}