import { Control, Component, VNode } from "tes-work";
import { IBaseComponent } from "../template/component";
import { alignPos } from "../ux/align/align";
import classNames from 'classnames';
import Popup from "../Popup/Popup";

export interface ITooltipProps extends IBaseComponent {
  /**气泡框位置 */
  placement?: alignPos,
  /**鼠标移入后延时多少才显示 Tooltip， 单位: ms */
  delay?: number;
  /**触发行为 */
  trigger?: 'hover' | 'focus' | 'click';
  /**变化回调 */
  onChange?: (visible: boolean) => void;
  /**是否可用 */
  disabled?: boolean;
  /**内容 */
  content?: string | VNode;
  /**默认提供的主题 */
  effect?: "dark" | "light";
}

@Component
export class Tooltip extends Control<ITooltipProps>{
  render() {
    const { 
      placement = 'top', 
      trigger = 'hover', delay = 100, 
      content, className, style, 
      effect = "dark", disabled 
    } = this.props;
    const clsName = classNames(
      't-tooltip__popper', `is-${effect}`, className
    )
    let popContent: VNode = content instanceof String ? new VNode(null, content, null) : content as VNode;
    const popup = (
      <Popup 
        type="event" 
        event={trigger} 
        align={placement} 
        delay={delay} 
        content={popContent} 
        className={clsName}
        disabled={disabled}
        style={style}
      >
        {this.$children}
      </Popup>
    );
    return popup;
  }
}

export default Tooltip;