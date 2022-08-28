import { Control, Component } from "tes-work";
import { IBaseComponent } from "../template/component";
import classNames from 'classnames';
import Menu from "./Menu";
import SubMenu from "./SubMenu";

export interface IMenuItemProps extends IBaseComponent {
  /**菜单ID */
  index?: string;
  /**禁用 */
  disabled?: boolean;
}

@Component
export class MenuItem extends Control<IMenuItemProps>{
  rootMenu: Menu;
  parentSubMenus:SubMenu[] = [];
  deep: number = 0;
  indexPath: string;

  protected componentWillMount() {
    let parent = this.$parent;
    while (parent) {
      if (parent instanceof Menu) {
        this.rootMenu = parent;
        this.deep++;
        break;
      } else if (parent instanceof SubMenu) {
        this.parentSubMenus.unshift(parent);
        this.deep++;
      }
      parent = parent.$parent;
    }
  }

  handleChick(e:MouseEvent) {
    e.stopPropagation();
    const { disabled } = this.props;
    if (!disabled) {
      this.rootMenu.handleItemCheck(this);
    }
  }

  render() {
    const { className, style= '', index, disabled } = this.props;
    const { offset = 24, mode = "vertical" } = this.rootMenu.props;
    const paddingLeft = mode === "vertical" ? `${this.deep * offset}px` : '';
    const clsName = classNames(
      "t-menu-item", className,
      {
        [`is-active`]: this.rootMenu.activeIndex === index,
        [`is-disabled`]: disabled
      }
    )
    return (
      <li
        class={clsName}
        style={`padding-left:${paddingLeft};${style}`}
        onClick={this.handleChick}
        id={index}
      >
        {this.$children}
      </li>
    )
  }
}

export default MenuItem;