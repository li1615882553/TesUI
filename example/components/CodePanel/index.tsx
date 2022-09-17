import { Control, Component, VNode } from "tes-work";
import Collapse from "@component/Collapse";
import MarkDown from "../Markdown";
import * as Prism from 'prismjs';

export interface IProps {
  text: any;
  demo: VNode;
  code?: string;
}

@Component
class CodePanel extends Control<IProps> {
  openSource:string = "";
  render() {
    const { code, text, demo } = this.props;
    const demoHTML = Prism.highlight(code, Prism.languages.jsx, "jsx");
    
    return (
      <div className='code-box'>
        <div className='code-box-intro'>
          <MarkDown md={text} />
        </div>
        <div className='code-box-demo'>
          {demo}
        </div>
        {
          code ? (
            <Collapse value={this.openSource} accordion>
              <Collapse.Item title='点击查看源码' key="source">
                <pre>
                  <code className='language-jsx' html={demoHTML} />
                </pre>
              </Collapse.Item>
            </Collapse>
          ) : null
        }
      </div>
    );
  }
}

export default CodePanel;