import { Control, Component, VNode, Bind } from "tes-work";
import { IBaseComponent } from "../template/component";
import classNames from 'classnames';

import Collapse from "./Collapse";

export interface ICollapseItem extends IBaseComponent {
  /**key，对应activeKey */
  key: string;
  /**是否禁用 */
  disabled?: boolean,
  /**折叠面板标题 */
  title?: string | VNode,
}

@Component
class CollapseItem extends Control<ICollapseItem> {
  collapse: Collapse;

  get isActive() {
    const { key } = this.props;
    return this.collapse.activeNames.indexOf(key) !== -1;
  }

  protected componentWillMount() {
    let parent = this.$parent;
    while (parent) {
      if (parent instanceof Collapse) {
        this.collapse = parent;
        break;
      }
      parent = parent.$parent;
    }
    this.collapse && this.collapse.items.push(this);
  }

  handleHeaderClick() {
    const { disabled } = this.props;
    if (disabled) return;
    this.collapse.handleItemClick(this);
  }

  render() {
    const {
      className, style, onChange, title, disabled, ...otherProps
    } = this.props;
    const preCls = 't-collapse-item';
    const clsName = classNames(
      preCls,
      {
        [`is-active`]: this.isActive,
        [`is-disabled`]: disabled,
      },
      className,
    );
    return (
      <div
        className={clsName}
        style={style}
        {...otherProps}
      >
        <div className={`${preCls}__header ${this.isActive ? 'is-active': ''}`} onClick={this.handleHeaderClick}>
          {title}
          <i class={`${preCls}__arrow iconfont icon-upArrow ${this.isActive ? 'is-active': ''}`}></i>
        </div>
        {
          this.isActive ?
            <div className={`${preCls}__wrap`}>
              <div className={`${preCls}__content`}>
                {this.$children}
              </div>
            </div> : null
        }
      </div>
    );
  }
}


export default CollapseItem;