import { Control, Component } from "tes-work";
import { IBaseComponent } from "../template/component";

export interface IMenuGroupProps extends IBaseComponent{
    /**分组标题 */
    title: string;
}

@Component
export class MenuGroup extends Control<IMenuGroupProps>{

}