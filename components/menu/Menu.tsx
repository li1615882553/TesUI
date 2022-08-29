import classNames from "classnames";
import { Control, Component, Watch } from "tes-work";
import { IBaseComponent } from "../template/component";
import MenuItem from "./MenuItem";
import MenuGroup from "./MenuItemGroup";

import "./menu.scss";
import SubMenu from "./SubMenu";

export interface IMenuProps extends IBaseComponent {
  /**模式 */
  mode?: 'vertical' | 'horizontal';
  /**当前激活菜单的 index */
  defaultActive?: string;
  /**当前打开的 sub-menu 的 index 的数组 */
  defaultOpeneds?: Array<string>;
  /**菜单子项偏移量 */
  offset?: number;
  /**subMenu展开回调 */
  onOpen?: (index: string) => void;
  /**subMenu收起回调 */
  onColse?: (index: string) => void;
  /** item - 选中回调 */
  onSelect?: (index: string) => void;
}

@Component
export class Menu extends Control<IMenuProps>{
  menuItems: MenuItem[] = [];
  menuGroups: MenuGroup[] = [];
  activeIndex: string;
  openedMenus: string[];

  componentWillMount(){
    const { defaultActive, defaultOpeneds } = this.props;
    this.activeIndex = defaultActive;
    this.openedMenus = defaultOpeneds ? defaultOpeneds.slice(0) : [];
  }

  handleItemCheck(menuItem: MenuItem) {
    const { index } = menuItem.props;
    this.activeIndex = index;
  }

  handleOpenChange(subMenu: SubMenu){
    const subMenuIndex = subMenu.props.index;
    if(this.openedMenus.indexOf(subMenuIndex) !== -1){
      subMenu.childMenuVisible = false;
      this.openedMenus.splice(this.openedMenus.indexOf(subMenuIndex), 1);
    }else{
      subMenu.childMenuVisible = true;
      this.openedMenus.push(subMenuIndex);
    }
  }

  render(){
    const { className, style, mode = "vertical", defaultActive } = this.props;
    const clsName = classNames(
      't-menu', `t-menu--${mode}`, className
    )

    return (
      <ul
        className={clsName}
        style={style}
      >
        { this.$children }
      </ul>
    )
  }
}

export default Menu;