import { Control, Component } from "tes-work";
import Button from "@component/Button";

@Component
class ButtonIcon extends Control {
  protected render(): void {
    return (
      <div class="button-demo">
        <Button type='primary' icon="icon-cancel"></Button>
        <Button type='primary' icon="icon-subtract"></Button>
        <Button type='primary' icon="icon-close"></Button>
        <Button type='primary' icon="icon-view">浏览</Button>
        <Button type='primary' icon="icon-add">添加</Button>
      </div>
    )
  }
}

export default ButtonIcon;