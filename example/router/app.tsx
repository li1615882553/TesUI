
import { Component, Control } from "tes-work";
import { Router, Route } from '../components/Router';
import MainLayout from './page/MainLayout';
import Menu from './page/Menu';
import Login from './page/Login';
import Abort from './page/Abort';

const Routers = [
  { path: '#/login', menu: 'login', component: <Login bread='#/abort'></Login> },
  { path: '#/abort', menu: 'abort', component: <Abort bread='#/login' /> },
]


@Component
class Panel extends Control {
  protected render(): void {
    return (
      <Router>
        <Menu routers={Routers} />
        <MainLayout>
          {Routers && Routers.map((item, index) => (<Route path={item.path} component={item.component} />))}
        </MainLayout>
      </Router>
    )
  }
}

let panel = new Panel();
panel.$renderTo(document.querySelector("#app"))