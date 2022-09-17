import { Control, Component } from "tes-work";
import Button from "@component/Button";
import Grid from "@component/Grid";

@Component
class ButtonDisabled extends Control {
  protected render(): void {
    return (
      <div class="button-demo">
        <Grid.Col>
          <Button disabled>default</Button>
          <Button type='primary' disabled>primary</Button>
          <Button type='danger' disabled>danger</Button>
          <Button type='success' disabled>success</Button>
          <Button type='warning' disabled>warning</Button>
        </Grid.Col>
        <Grid.Col>
          <Button plain disabled>default</Button>
          <Button type='primary' plain disabled>primary</Button>
          <Button type='danger' plain disabled>danger</Button>
          <Button type='success' plain disabled>success</Button>
          <Button type='warning' plain disabled>warning</Button>
        </Grid.Col>
      </div>
    )
  }
}

export default ButtonDisabled;