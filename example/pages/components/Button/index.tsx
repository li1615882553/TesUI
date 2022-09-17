import { Control, Component } from "tes-work";
import MarkDown from "../../../components/Markdown";
import CodePanel from "../../../components/CodePanel";

import ButtonDemo from './demo/buttonDemo';
//@ts-ignore
import * as buttonDemoMd from './demo/buttonDemo.md';
const buttonDemoCode = require('!raw-loader!./demo/buttonDemo').default;

import ButtonDisabled from './demo/buttonDisabled';
import * as buttonDisabledMd from './demo/buttonDisabled.md';
const buttonDisabledCode = require('!raw-loader!./demo/buttonDisabled').default;

import ButtonIcon from './demo/buttonIcon';
import * as buttonIconMd from './demo/buttonIcon.md';
const buttonIconCode = require('!raw-loader!./demo/buttonIcon').default;

@Component
class ButtonPage extends Control {
  protected render(): void {
    return (
      <div>
        <h2>Button 按钮</h2>
        <span>按钮操作</span>
        <CodePanel text={buttonDemoMd.default} demo={<ButtonDemo/>} code={buttonDemoCode}/>
        <CodePanel text={buttonDisabledMd.default} demo={<ButtonDisabled/>} code={buttonDisabledCode}/>
        <CodePanel text={buttonIconMd.default} demo={<ButtonIcon/>} code={buttonIconCode}/>
      </div>
    )
  }
}

export default <ButtonPage />