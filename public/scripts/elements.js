class Elements {
  elements = [];
  gravity = 0.8;
  badChance = 0.15;
  startY = 120;
  history = [];
  intervalTime = 4000;
  interval;

  constructor(props) {
    this.canvas = document.querySelector('#canvas-2');
    this.canvas.width = props.canvas.width;
    this.canvas.height = props.canvas.height;
    this.context = this.canvas.getContext('2d');
    this.player = props.player;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.endY = this.height - 200;
    this.generateElement = this.generateElement.bind(this);
    this.generateElement();

    this.interval = setInterval(() => {
      this.generateElement();
    }, this.intervalTime)

    this.draw = this.draw.bind(this);
    window.requestAnimationFrame(this.draw)
  }

  draw(){
    this.context.save();
    this.context.beginPath();
    this.context.clearRect(0,this.startY - 100, this.canvas.width, this.canvas.height);
    this.elements.map(element => {
      let {x, y} = element.getBoundaries();
      y += this.gravity;
      element.setCoords(x, y);
      this.context.drawImage(element.image, x, y, 100, 100)
    })
    this.context.restore();

    window.requestAnimationFrame(this.draw)
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateElement(){
    let type = Math.random() <= this.badChance ? 'bad' : 'good';
    const x = this.randomInteger(0, this.width)
    const maxVariants = type === 'good' ? 4 : 2;
    const variant = this.randomInteger(1, maxVariants);

    const path = '/static/images/elements/' + type + '_' + variant + '.png';

    const img = new Image();
    img.src = path;
    img.onload = () => {
      const element = new Element({
        x,
        y: this.startY,
        img,
        canvas: this.canvas,
        context: this.context
      })
      this.elements.push(element);
    }
  }
}

class Element {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.width = 100;
    this.height = 100;
    this.canvas = props.canvas;
    this.context = props.context;
    this.getBoundaries = this.getBoundaries.bind(this);
    this.context.drawImage(props.img, this.x, this.y, 100, 100);
    this.image = props.img;
    this.getImageData = this.getImageData.bind(this);
    this.setCoords = this.setCoords.bind(this);
  }

  getImageData(){
    console.log(this.x, this.y)
    return this.context.getImageData(this.x, this.y, 100, 100)
  }

  setCoords(x, y){
    this.x = x;
    this.y = y;
  }

  getBoundaries(){
    return {
      x: this.x,
      y: this.y
    }
  }
}