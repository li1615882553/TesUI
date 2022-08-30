import { Control, Component, VNode } from "tes-work";
import { IBaseComponent } from "../template/component";
import classNames from "classnames";

import Menu from "./Menu";
import SubMenu from "./SubMenu";

export interface IMenuItemGroupProps extends IBaseComponent {
  /**分组标题 */
  title: string | VNode;
}

@Component
export class MenuItemGroup extends Control<IMenuItemGroupProps>{
  rootMenu: Menu;
  deep: number = 0;

  protected componentWillMount() {
    let parent = this.$parent;
    while (parent) {
      if (parent instanceof Menu) {
        this.rootMenu = parent;
        this.deep++;
        break;
      } else if (parent instanceof SubMenu) {
        this.deep++;
      }
      parent = parent.$parent;
    }
  }

  handleClick(e: MouseEvent){
    e.stopPropagation();
  }

  render() {
    const { className, style, title } = this.props;
    const { mode = "vertical", offset = 24 } = this.rootMenu.props;
    const clsName = classNames(
      "t-menu-item-group", className,
    );
    const paddingLeft = mode === "vertical" ? `${this.deep * offset}px` : '';
    return (
      <li
        className={clsName}
        style={style}
      >
        <div
          className="t-menu-item-group__title"
          style={`padding-left: ${paddingLeft}`}
          onClick={this.handleClick}
        >
          {title}
        </div>
        <ul>
          {this.$children}
        </ul>
      </li>
    );
  }
}

export default MenuItemGroup;