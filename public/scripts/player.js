class Player {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
    this.scaleX = 1;
    this.scaleY = 1;
    this.context = props.context
    this.renderPlayer('/static/images/elements/player.png', [this.x - 50, this.y, this.width, this.height])
    this.canvas = props.canvas;
    this.control = props.control;

    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.getBounds = this.getBounds.bind(this);

    this.control.addEventListener('mousedown', (e) => {
      const {layerX, layerY} = e;
      const playerState = this.getBounds();
      this.captured = this.isCapturePlayer(playerState, {x: layerX, y: layerY});

      if (this.captured) {
        this.control.addEventListener('mouseup', this.mouseUp)
        this.control.addEventListener('mousemove', this.mouseMove)
      }
    })

    this.draw = this.draw.bind(this)
  }

  mouseMove(e){
    this.x = e.layerX;
  }

  mouseUp(){
    this.captured = false;
    this.control.removeEventListener('mouseup', this.mouseUp);
    this.control.removeEventListener('mousemove', this.mouseMove);
  }

  isCapturePlayer(playerState, mouseState){
    return mouseState.x >= playerState.x - 50 && mouseState.x <= playerState.x + playerState.width &&
      mouseState.y >= playerState.y && mouseState.y <= playerState.y + playerState.height
  }

  draw() {
    this.context.save();
    this.context.beginPath();
    //this.context.clearRect(0,this.y - 100,this.canvas.width, this.canvas.height)
    //this.context.putImageData(this.player, this.x - 50, this.y)

    this.context.restore();
    window.requestAnimationFrame(this.draw)
  }

  async renderPlayer(imagePath, coords, hover){
    const img = new Image();
    img.src = imagePath;
    img.onload = () => {
      this.context.drawImage(img, ...coords);
      this.player = this.context.getImageData(...coords);
      this.draw()
    }
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
}
