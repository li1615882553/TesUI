import { Control, Component, VNode } from "tes-work";
import { marked } from 'marked';
import * as Prism from 'prismjs';
require('prismjs/components/prism-jsx.min');
require('../../../node_modules/prismjs/themes/prism.css');

@Component
export default class MarkDown extends Control {
  protected render(): void {
    marked.setOptions({
      gfm: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight(code, lang) {
          if(lang === 'jsx'){
            // return Prism.highlight(code, Prism.languages.jsx);
          }else{
            return require('highlight.js').highlight(lang || 'js', code).value;
          }
      },
    })
  }
}
