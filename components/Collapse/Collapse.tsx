import { Control, Component } from "tes-work";
import { IBaseComponent } from "../template/component";
import classNames from 'classnames';


import CollapseItem from "./CollapseItem";

export interface ICollapse extends IBaseComponent {
  /**绑定值，当前激活的面板 */
  value: string | string[];
  /**手风琴模式  每次只能展开一个面板 */
  accordion?: boolean,
  /**变化回调 */
  onChange?: (activeKeys: string[] | string) => void;
}

@Component
class Collapse extends Control<ICollapse> {
  static Item: typeof CollapseItem;

  items: CollapseItem[] = [];
  activeNames: string[] | string;

  setActiveNames(activeNames: string[] | string) {
    const { accordion, onChange } = this.props;
    this.activeNames = activeNames;
    this.props.value = activeNames;
    onChange && onChange(activeNames);
  }

  handleItemClick(item: CollapseItem) {
    const { accordion } = this.props;
    if (accordion) {
      this.setActiveNames(this.activeNames === item.props.key ? '' : item.props.key);
    } else {
      let activeNames = this.activeNames.slice(0) as string[];
      let index = activeNames.indexOf(item.props.key);

      if (index > -1) {
        activeNames.splice(index, 1);
      } else {
        activeNames.push(item.props.key);
      }
      this.setActiveNames(activeNames);
    }
  }
  
  componentWillMount(){
    const { value } = this.props;
    this.activeNames = value;
  }

  render() {
    const {
      className, style, value, accordion, onChange, ...otherProps
    } = this.props;
    const preCls = 't-collapse';
    const clsName = classNames(
      preCls, className,
    );
    return (
      <div
        className={clsName}
        style={style}
        {...otherProps}
      >
        {this.$children}
      </div>
    );
  }
}

export default Collapse;