import { Control, Component } from "tes-work";
import Collapse from "../../../../components/Collapse/index";

@Component
class CollapsePage extends Control {
  openItem: string[] = ["0"];
  protected render(): void {
    return (
      <div>
        <p>Collapse</p>
        <Collapse value={this.openItem}>
          <Collapse.Item key="0" title="一致性 Consistency">
            <span>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </span>
          </Collapse.Item>
          <Collapse.Item key="1" title="反馈 Feedback">
            <span>
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
              页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
            </span>
          </Collapse.Item>
        </Collapse>
      </div >
    )
  }
}

export default <CollapsePage />