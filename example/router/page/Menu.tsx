import { Component, Control } from "tes-work";

@Component
export default class Menu extends Control {
  protected render(): void {
    const { routers } = this.props;
    return (
      <div>
        {routers && routers.map((item, index) => {
          let { path, menu, component } = item;
          return (
            <div key={path} onClick={() => { window.location.href = path }}><a>{menu}</a></div>
          )
        })}
      </div>
    )
  }

}