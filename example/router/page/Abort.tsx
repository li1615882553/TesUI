
import { Component, Control } from "tes-work";
import { listenAll, listenPath } from '../../components/Router';

listenPath('#/abort', () => {
	console.info('listenPath abort')
})

listenAll((pathname) => {
	if(pathname === '#/abort'){
		console.info('listenAll abort')
	}
})

@Component
export default class Abort extends Control {
  protected render(): void {
    let { bread } = this.props;
    console.log(bread)
    return (
      <div style={`width:100%; height:100%; border:1px solid #5d9cec`}>
        <div>abort</div>
        {bread && <a href={bread}>bread{bread}</a>}
      </div>
    )
  }
}