import { Control, Component } from "tes-work";
import { IBaseComponent } from "../template/component";

export interface ISubMenuProps extends IBaseComponent{
  /**submenu ID */
  index?: string;
  /**是否禁用 */
  disabled?:boolean;
}

@Component
export class SubMenu extends Control<ISubMenuProps>{

}