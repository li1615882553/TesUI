import { Control, Component, VNode } from "tes-work";
import { IBaseComponent } from "../template/component";
import classNames from "classnames";
import Menu from "./Menu";
import Popup from "@component/popup/popup";
export interface ISubMenuProps extends IBaseComponent {
  /**submenu ID */
  index: string;
  /**是否禁用 */
  disabled?: boolean;
  /**标题 */
  title: string | VNode;
  /**展开 sub-menu 的延时 */
  showTime?: number;
  /**收起 sub-menu 的延时 */
  hideTime?: number;
}

@Component
export class SubMenu extends Control<ISubMenuProps>{
  rootMenu: Menu;
  deep: number = 0;
  timeout;
  mouseInChild: boolean = false;
  get opend() {
    const { index } = this.props;
    return this.rootMenu.openedMenus.indexOf(index) !== -1;
  }

  handleOpen(e: MouseEvent) {
    e.stopPropagation();
    const { mode = "vertical", menuTrigger = "hover", } = this.rootMenu.props;
    const { disabled, index } = this.props;

    if ((menuTrigger === "hover" && mode === "horizontal") || disabled) return;
    this.rootMenu.handleSubmenuClick(this);
  }

  handleMouseEnter(e: MouseEvent) {
    const { disabled, showTime = 300, index } = this.props;
    const { mode = "vertical", menuTrigger = "hover", } = this.rootMenu.props;
    if ((menuTrigger === "click" && mode === "horizontal") || disabled) return;

    Object.keys(this.rootMenu.subMenus).forEach(subMenu => {
      if(this.rootMenu.subMenus[subMenu].deep !== this.deep){
        console.log("触发enter")
        this.rootMenu.subMenus[subMenu].mouseInChild = true;
        clearTimeout(this.rootMenu.subMenus[subMenu].timeout);
      }
    });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.rootMenu.openMenu(index);
    }, showTime);
  }
  handleMouseLeave(e: MouseEvent) {
    const { disabled, hideTime = 100, index } = this.props;
    const { mode = "vertical", menuTrigger = "hover", } = this.rootMenu.props;
    if ((menuTrigger === "click" && mode === "horizontal") || disabled) return;

    console.log("触发leave")
    Object.keys(this.rootMenu.subMenus).forEach(subMenu => {
      console.log(this.rootMenu.subMenus[subMenu].deep , this.deep)
      if(this.rootMenu.subMenus[subMenu].deep === this.deep){
        this.rootMenu.subMenus[subMenu].mouseInChild = false;
        clearTimeout(this.rootMenu.subMenus[subMenu].timeout);
      }
    });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      !this.mouseInChild && this.rootMenu.closeMenu(index);
    }, hideTime);
  }

  protected componentWillMount() {
    let parent = this.$parent;
    while (parent) {
      if (parent instanceof Menu) {
        this.rootMenu = parent;
        this.deep++;
        this.rootMenu.addSubMenu(this);
        break;
      } else if (parent instanceof SubMenu) {
        this.deep++;
      }
      parent = parent.$parent;
    }
  }
  protected componentWillDestory(): void {
    this.rootMenu.removeSubMenu(this);
  }

  render() {
    const { className, style, title, disabled } = this.props;
    const { mode = "vertical", offset = 24 } = this.rootMenu.props;
    const clsName = classNames(
      "t-submenu", className,
      {
        [`is-open`]: this.opend,
        [`is-disabled`]: disabled,
      },
    );
    const paddingLeft = mode === "vertical" ? `${this.deep * offset}px` : '';
    const action = mode === "vertical" ?
      {
        onClick: this.handleOpen
      } : {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      };
    const titleContent = (
      <div
        className="t-submenu__title"
        style={`padding-left:${paddingLeft};`}
      >
        {title}
        <i class={`t-submenu__arrow iconfont icon-downArrow`}></i>
      </div>
    );

    return (
      <li
        className={clsName}
        style={style}
        {...action}
      >
        {
          mode === "horizontal" ?
            (
              <Popup
                type="visible"
                align={ this.deep === 1 ? "bottom" : "rr-cc" }
                visible={this.opend}
                style="position:absolute;"
                margin={0}
                content={<ul className="t-menu t-menu--popup" onMouseEnter={this.handleMouseEnter} onMouseLeave = {this.handleMouseLeave} >{this.$children}</ul>}
              >
                {titleContent}
              </Popup>
            ) :
            (
              <div>
                { titleContent }
                <ul className="t-menu" style={`display:${this.opend ? '' : 'none'}`}>
                  {this.$children}
                </ul>
              </div>
            )
        }
      </li>
    )
  }
}

export default SubMenu;