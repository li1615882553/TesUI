
import { Component, Control } from "tes-work";
import { listenAll, listenPath } from '../../components/Router';

listenPath('#/login', () => {
  console.info('listenPath login1')
})

listenAll((pathname) => {
  if (pathname === '#/login') {
    console.info('listenAll login')
  }
})

@Component
export default class Login extends Control {
  protected render(): void {
    let { bread } = this.props;
    return (
      <div style={`width:100%; height:100%; border:1px solid #5d9cec`}>
        <div>login</div>
        {bread && <a href={bread}>bread{bread}</a>}
      </div>
    )
  }
}