import CannonBody from 'Assets/rogue_packages/rogue-cannon/Components/CannonBody.re'
import * as RE from 'rogue-engine'

export default class Ball extends RE.Component {
  bodyComponent: CannonBody
  @RE.Prop('Number') speed = 50

  awake() {
    this.bodyComponent = RE.getComponent(CannonBody, this.object3d) as CannonBody
    this.bodyComponent.body.velocity.set(Math.random() * 2 - 0.5, 1, 0)
  }

  update() {
    const velocity = this.bodyComponent.body.velocity

    if (velocity.length() !== this.speed) {
      velocity.normalize()
      velocity.scale(this.speed, velocity)
    }
  }
}

RE.registerComponent(Ball)
