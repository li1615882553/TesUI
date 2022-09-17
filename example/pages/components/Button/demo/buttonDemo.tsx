import { Control, Component } from "tes-work";
import Button from "@component/Button";
import Grid from "@component/Grid";

@Component
class ButtonDemo extends Control {
  protected render(): void {
    return (
      <div class="button-demo">
        <Grid.Col>
          <Button>default</Button>
          <Button type='primary'>primary</Button>
          <Button type='danger'>danger</Button>
          <Button type='success'>success</Button>
          <Button type='warning'>warning</Button>
        </Grid.Col>
        <Grid.Col>
          <Button plain>default</Button>
          <Button type='primary' plain>primary</Button>
          <Button type='danger' plain>danger</Button>
          <Button type='success' plain>success</Button>
          <Button type='warning' plain>warning</Button>
        </Grid.Col>
        <Grid.Col>
          <Button round>default</Button>
          <Button type='primary' round>primary</Button>
          <Button type='danger' round>danger</Button>
          <Button type='success' round>success</Button>
          <Button type='warning' round>warning</Button>
        </Grid.Col>
        <Grid.Col>
          <Button circle icon="icon-view"></Button>
          <Button type='primary' circle icon="icon-add"></Button>
          <Button type='danger' circle icon="icon-close"></Button>
          <Button type='success' circle icon="icon-cancel"></Button>
          <Button type='warning' circle icon="icon-subtract"></Button>
        </Grid.Col>
      </div>
    )
  }
}

export default ButtonDemo;