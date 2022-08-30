import { Control, Component } from "tes-work";
import { IBaseComponent } from "../template/component"
import { escapeRegexpString } from "../utils/util";
import { isArray } from "../utils/array/array";
import Option from "./Option";

import "./optionGroup.scss"
import Select from "./Select";


export interface IOptionsGroupProps extends IBaseComponent {
  /**组名 */
  label?: string;
  /**是否禁用 */
  disabled?: boolean;
}

@Component
class OptionGroup extends Control<IOptionsGroupProps> {
  visible: boolean = true;
  render() {
    const { className = '', style, label } = this.props
    return (
      <ul
        className={`t-select-group__wrap ${className}`}
        style={`${this.visible ? '' : 'display:none;'}${style}`}
      >
        <li class="t-select-group__title">{ label }</li>
        <li>
          <ul class="t-select-group">
            { this.$children }
          </ul>
        </li>
      </ul>
    )
  }

  protected componentMounted() {
    let parent = this.$parent;
    while (parent) {
      if(parent instanceof Select){
        (parent.optionGroups.push(this));
        break;
      }
      parent = parent.$parent;
    }
  }

  queryChange() {
    this.visible = this.$children && isArray(this.$children) && 
      this.$children.some(option => (option.result as Option).visible === true);
  }
}

export default OptionGroup;