import { Control, Component, VNode } from "tes-work";
import { IBaseComponent } from "../template/component";
import classNames from "classnames";
import Menu from "./Menu";
export interface ISubMenuProps extends IBaseComponent {
  /**submenu ID */
  index: string;
  /**是否禁用 */
  disabled?: boolean;
  /**标题 */
  title: string | VNode;
}

@Component
export class SubMenu extends Control<ISubMenuProps>{
  rootMenu: Menu;
  deep: number = 0;
  childMenuVisible: boolean = false;

  openChange() {
    const { disabled, index } = this.props;
    if (disabled) return;
    if (this.rootMenu.handleOpenChange) {
      this.rootMenu.handleOpenChange(this);
    }
  }

  protected componentWillMount() {
    const { index } = this.props;
    let parent = this.$parent;
    while (parent) {
      if (parent instanceof Menu) {
        this.rootMenu = parent;
        this.deep++;
        this.childMenuVisible = this.rootMenu.openedMenus.indexOf(index) !== -1;
        break;
      } else if (parent instanceof SubMenu) {
        this.deep++;
      }
      parent = parent.$parent;
    }
  }

  render() {
    const { className, style, title, index, disabled } = this.props;
    const { mode = "vertical", offset = 24 } = this.rootMenu.props;
    const clsName = classNames(
      "t-submenu", className,
      {
        [`is-open`]: this.childMenuVisible,
        [`is-disabled`]: disabled,
      },
    );
    const paddingLeft = mode === "vertical" ? `${this.deep! * offset}px` : '';
    const action = mode === "vertical" ?
      {
        onClick: this.openChange
      } : {
        onMouseEnter: () => { this.childMenuVisible = true },
        onMouseLeave: () => { this.childMenuVisible = false }
      };
    return (
      <li
        className={clsName}
        {...action}
      >
        <div
          className="t-submenu__title"
          style={`"padding-left:${paddingLeft}"`}
        >
          {title}
          <i class={`t-submenu__arrow iconfont ${this.childMenuVisible ? "icon-downArrow" : "icon-upArrow"}`}></i>
        </div>
        {
          this.childMenuVisible ?
            (<ul className="t-menu">
              {this.$children}
            </ul>)
            : null
        }
      </li>
    )
  }
}

export default SubMenu;