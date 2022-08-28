import { Control, Component } from "tes-work";
import { IBaseComponent } from "../template/component";

export interface IMenuProps extends IBaseComponent{
  /**模式 */
  mode?: 'vertical' | 'horizontal';
  /**当前激活菜单的 index */
  defaultActive?: string;
  /**当前打开的 sub-menu 的 index 的数组 */
  defaultOpeneds?: Array<string>;
  /**subMenu展开回调 */
  onOpen?:(index: string) => void;
  /**subMenu收起回调 */
  onColse?:(index: string) => void;
  /** item - 选中回调 */
  onSelect?:(index: string) => void;
}

@Component
export class Menu extends Control<IMenuProps>{
  
}