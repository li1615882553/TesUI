import { Control, Component } from "tes-work";
import { IBaseComponent } from "../template/component";

export interface IMenuItemProps extends IBaseComponent{
  /**菜单ID */
  index?: string;
  /**禁用 */
  disabled?: boolean;
}

@Component
export class MenuItem extends Control<IMenuItemProps>{

}