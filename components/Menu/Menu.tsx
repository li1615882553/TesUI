import classNames from "classnames";
import { Control, Component, Watch } from "tes-work";
import { IBaseComponent } from "../template/component";
import MenuItem from "./MenuItem";
import MenuItemGroup from "./MenuItemGroup";

import SubMenu from "./SubMenu";

export interface IMenuProps extends IBaseComponent {
  /**模式 vertical垂直  horizontal水平*/
  mode?: 'vertical' | 'horizontal';
  /**当前激活菜单的 index */
  defaultActive?: string;
  /**当前打开的 sub-menu 的 index 的数组 */
  defaultOpeneds?: Array<string>;
  /**菜单子项偏移量 */
  offset?: number;
  /**子菜单打开的触发方式(只在 mode 为 horizontal 时有效) */
  menuTrigger?: "hover" | "click";
  /**subMenu展开回调 */
  onOpen?: (index: string) => void;
  /**subMenu收起回调 */
  onClose?: (index: string) => void;
  /** item - 选中回调 */
  onSelect?: (index: string) => void;
}

@Component
export class Menu extends Control<IMenuProps>{
  static Item: typeof MenuItem;
  static SubMenu: typeof SubMenu;
  static ItemGroup: typeof MenuItemGroup;

  menuItems: { string?: MenuItem } = {};
  subMenus: { string?: SubMenu } = {};
  menuGroups: { string?: MenuItemGroup } = {};
  activeIndex: string;
  openedMenus: string[];

  addMenuItem(item: MenuItem) {
    this.menuItems[item.props.index] = item;
  }
  removeMenuItem(item: MenuItem) {
    delete this.menuItems[item.props.index];
  }

  addSubMenu(subMenu: SubMenu) {
    this.subMenus[subMenu.props.index] = subMenu;
  }
  removeSubMenu(subMenu: SubMenu) {
    delete this.subMenus[subMenu.props.index];
  }
  openMenu(index) {
    if (this.openedMenus.indexOf(index) !== -1) return;
    this.openedMenus.push(index);
  }
  closeMenu(index) {
    const i = this.openedMenus.indexOf(index);
    if (i !== -1) {
      this.openedMenus.splice(i, 1);
    }
  }
  //初始化展开菜单
  initOpenMenu() {
    const index = this.activeIndex;
    const activeItem = this.menuItems[index];
    const { mode = "vertical" } = this.props;
    if (!activeItem || mode === "horizontal") return;

    let indexPath = activeItem.indexPath;
    indexPath.forEach(index => {
      let subMenu = this.subMenus[index];
      subMenu && this.openMenu(index);
    })
  }

  handleSubmenuClick(subMenu: SubMenu) {
    const { onOpen, onClose } = this.props;
    const subMenuIndex = subMenu.props.index;
    if (this.openedMenus.indexOf(subMenuIndex) !== -1) {
      this.openedMenus.splice(this.openedMenus.indexOf(subMenuIndex), 1);
      onClose && onClose(subMenuIndex);
    } else {
      this.openedMenus.push(subMenuIndex);
      onOpen && onOpen(subMenuIndex);
    }
  }

  handleItemCheck(menuItem: MenuItem) {
    const { onSelect, mode = "vertical" } = this.props;
    const { index } = menuItem.props;
    this.activeIndex = index;

    onSelect && onSelect(index);

    if(mode === "horizontal"){
      this.openedMenus = [];
    }
  }

  protected componentWillMount(): void {
    const { defaultActive, defaultOpeneds } = this.props;
    this.activeIndex = defaultActive;
    this.openedMenus = defaultOpeneds ? defaultOpeneds.slice(0) : [];
  }
  protected componentMounted(): void {
    this.initOpenMenu();
  }

  render() {
    const { className, style, mode = "vertical" } = this.props;
    const clsName = classNames(
      't-menu', `t-menu--${mode}`, className
    )

    return (
      <ul
        className={clsName}
        style={style}
      >
        {this.$children}
      </ul>
    )
  }
}

export default Menu;