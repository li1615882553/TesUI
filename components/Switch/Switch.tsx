import { Control, Component } from "tes-work";
import { IBaseComponent } from "../template/component"
import classNames from 'classnames';

export interface ISwitchProps extends IBaseComponent {
  /**绑定值 */
  value?: boolean;
  /**是否禁用 */
  disabled?: boolean;
  /**尺寸 */
  size?: 'small' | 'large' | 'default';
  /**是否可关闭 */
  closeable?: boolean;
  /**打开时的文字描述 */
  activeText?: string;
  /**关闭时的文字描述 */
  inactiveTest?: string;
  /**变化回调 */
  onChange?: (checked: boolean) => void;
}

@Component
export class Switch extends Control<ISwitchProps>{
  handleClick() {
    const { disabled, value, onChange } = this.props;
    if (disabled) {
      return;
    }
    this.props.value = !value;
    if (onChange) {
      onChange(this.props.value);
    }
  }

  protected render(): void {
    const { className, style, disabled, size = "default", value, inactiveTest, activeText } = this.props;
    const switchCls = {
      [`is-disabled`]: disabled,
      [`is-checked`]: value
    }
    const clsName = classNames(
      't-switch', switchCls, `t-switch-${size}`, className
    );

    return (
      <div
        className={clsName}
        style={style}
        onClick={this.handleClick}
      >
        {inactiveTest ? <span className={`t-switch__label t-switch__label--left ${!value ? 'is-active' : ''}`}>{inactiveTest}</span> : null}
        <span class="t-switch__core"></span>
        {activeText ? <span className={`t-switch__label t-switch__label--right ${value ? 'is-active' : ''}`}>{activeText}</span> : null}
      </div>
    )
  }
}

export default Switch;