import classNames from 'classnames';
import { IBaseComponent } from "../template/component";
import {Component, Control} from "tes-work";

export interface IButtonProps extends IBaseComponent {
  /**是否禁用 */
  disabled?: boolean,

  loading?: boolean,

  type?: 'primary' | 'warning' | 'danger' | 'success' | 'default';

  size?: 'small' | 'large' | 'default';

  icon?: string,

  plain?: boolean,

  round?: boolean,

  tail?: boolean,

  circle?: boolean
}

@Component
class Button extends Control<IButtonProps> {
  public name: string;

  onClick = () => {
    const { loading, disabled, onClick } = this.props;
    if (loading || disabled) {
      return;
    }
    if (onClick) {
      onClick();
    }
  }

  protected render() {
    const {
      className, style, loading, disabled, type, circle, icon, plain, size, round, tail, ...otherProps
    } = this.props;
    const preCls = "t-button";
    const btnCls = {
      [`${preCls}-${type}`]: type,
      [`${preCls}-${size}`]: !!size,
      [`is-disable`]: !!disabled,
      [`is-circle`]: !!circle,
      [`is-round`]: !!round,
      [`is-plain`]: !!plain,
    }

    const clsName = classNames(
      preCls, btnCls, className
    )
    return (
      <button
        className={clsName}
        style={style}
        disabled={disabled}
        onClick={this.onClick}
        {...otherProps}
      >
        {!!loading ? <i className="iconfont icon-loading"></i> : ""}
        {!tail && !loading && icon ? <i className={`iconfont ${icon}`}></i> : null}
        {this.$children ? <span> {this.$children} </span> : null}
        {tail && !loading && icon ? <i className={`iconfont ${icon}`}></i> : null}
      </button>
    );
  }
}

export default Button;
