import { Control, Component, VNode } from "tes-work";
import { marked } from 'marked';
import * as Prism from 'prismjs';
require('prismjs/components/prism-jsx.min');
require('../../../node_modules/prismjs/themes/prism.css');

export interface IMarkDownProps {
  md: any;
}

@Component
export default class MarkDown extends Control<IMarkDownProps> {
  protected render(): void {
    const { md } = this.props;
    marked.setOptions({
      gfm: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight(code, lang) {
          if(lang === 'jsx'){
            return Prism.highlight(code, Prism.languages.jsx, "jsx");
          }else{
            return require('highlight.js').highlight(lang || 'js', code).value;
          }
      }
    })
    return (
      <div className='markdown-body' html={marked(md)}></div>
    );
  }
}
