import { Component, Control } from "tes-work";

@Component
export default class MainLayout extends Control {
  protected render(): void {
      return(
        <div>
          { this.$children }
        </div>
      )
  }
}