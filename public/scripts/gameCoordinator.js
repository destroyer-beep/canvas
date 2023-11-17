class GameCoordinator {
  level = 0;
  isGameStarted = false;
  isControlRendered = false;
  isSoundMuted = false;
  timer = 120;
  experience = 0;
  step = 0;
  max_step = 3;
  hoverCoords = [];
  shapes = [];
  constructor(context, controlLayer, canvas) {
    this.context = context;
    this.canvas = canvas;
    this.width = controlLayer.offsetWidth;
    this.height = controlLayer.offsetHeight;

    canvas.width = this.width;
    canvas.height = this.height;

    const defaultWidth = this.width;
    const defaultHeight = this.height;

    const extractValues = (el) => {
      if (typeof el === 'function'){
        el = Array.from(Object.values(el()))
      }
      return el;
    }

    controlLayer.addEventListener('mousemove', (e) => {
      const {layerX, layerY} = e;
      const possibleObjectsY = this.hoverCoords.filter(el => {
        el = extractValues(el);

        return layerY >= el[1] && layerY <= el[1] + el[3]
      })

      const isHover = possibleObjectsY.filter(el => {
        el = extractValues(el);

        return layerX >= el[0] && layerX <= el[0] + el[2]
      }).length > 0

      controlLayer.className = isHover ? 'hover' : '';
    })

    window.addEventListener('resize', () => {
      const layer = document.querySelector('#control-layer')
      this.width = layer.offsetWidth;
      this.height = layer.offsetHeight;

      const different = {
        width: (this.width - defaultWidth) / 2,
        height: this.height - defaultHeight
      }

      canvas.width = this.width;
      canvas.height = this.height;

      this.shapes.map(el => this.context.putImageData(el, different.width, different.height))
    })
  }

  experienceToNextLevel(level){
    switch (level){
      case 1: return 100;
      case 2: return 200;
      case 3: return 300;
      case 4: return 400;
    }
  }

  getSoundIcon(){
    const image = document.createElement('img');
    image.src = '/static/images/elements/' + (this.isSoundMuted ? 'sounds_off.png' : 'sounds_on.png');
    image.className = 'sound-icon'

    image.addEventListener('click', () => {
      this.isSoundMuted = !this.isSoundMuted;
      this.refreshSoundIcon();
    })
    return image;
  }

  refreshSoundIcon(){
    const icon = this.getSoundIcon();
    this.controlLayer.querySelector('.sound-icon')?.remove();
    this.controlLayer.appendChild(icon);
  }

  buildButton(type, onClick){
    const image = document.createElement('img');
    image.src = '/static/images/buttons/' + type + '.png';
    image.addEventListener('click', () => {console.log(1);onClick()});
    image.className = 'game-button-' + type;
    return image;
  }

  async initPlayer(){
    await this.renderCanvasImage('/static/images/elements/player.png',
      [(this.width / 2 - 50), this.height * 0.85, 100, 100], true)
  }



  async renderCanvasImage(imagePath, coords, hover){
    const img = new Image();
    img.src = imagePath;

    if (hover) this.hoverCoords.push(coords);

    return new Promise(res => {
      img.onload = () => {
        this.context.drawImage(img, ...coords)

        this.shapes.push(this.context.getImageData(0,0, this.width, this.height))
        res()
      }
    })
  }

  async startGame(){
    this.controlLayer.innerHTML = '';
    this.level = 1;

    this.canvas.className = 'game';

    this.player = new Player({
      x: this.width / 2 - 50,
      y: this.height * 0.85,
      width: 100,
      height: 100,
      context: this.context,
      canvas: this.canvas,
      control: this.controlLayer
    })

    this.elements = new Elements({
      canvas: this.canvas,
      context: this.context,
      player: this.player
    });

    this.hoverCoords.push(this.player.getBounds)

    if (this.level === 1){
      await this.renderCanvasImage(this.getHousePath(this.level), [(this.width / 2 - 125), this.height - 472, 250, 150])
    }
    this.refreshSoundIcon();
    this.initTimer()
  }

  initTimer(){
    this.interval = setInterval(() => {
      document.querySelector('.game-timer')?.remove();

      if (this.timer === 1) {
        clearInterval(this.interval);
      }
      this.timer -= 1;

      const left = Math.floor(this.timer / 60);
      const right = Math.round(this.timer % 60);

      this.buildText(left + ':' + right, 'game-timer')
    }, 1000)
    this.buildText()
  }

  buildText(text, className, styles){
    const span = document.createElement('span');
    if (className) span.className = className;
    span.textContent = text;
    const keys = styles ? Array.from(Object.keys(styles)) : [];

    if (keys.length){
      keys.map(key => {
        span.style[key] = styles[key];
      })
    }

    this.controlLayer.appendChild(span);
  }

  buildBackground(type, className){
    const image = document.createElement('img');
    image.src = '/static/images/' + type + '.png';
    if (className) image.className = className;
    this.controlLayer.appendChild(image);
    return image;
  }


  async buildStartWindow(controlLayer){
    this.controlLayer = controlLayer;

    return new Promise((res, rej) => {
      const image = document.createElement('img');
      image.src = '/static/images/loader.png';
      image.className = 'loader-background';
      this.buildBackground('loader', 'loader-background')
      this.refreshSoundIcon();
      controlLayer.appendChild(image);
      this.buildText('ЛОВИ ИХ!', 'game-loader-text-header')
      this.buildText('Собери все инвестиции и вырасти бизнес!', 'game-loader-text-header-sub')
      controlLayer.appendChild(this.buildButton('play', res));
    })
  }

  getHousePath = (level) => '/static/images/houses/house_' + level + '.png';

  buildStepButton(direction, callback){
    const image = document.createElement('img');
    image.src = '/static/images/elements/control-' + direction + '.png';
    image.className = 'control-' + direction;
    image.addEventListener('click', () => callback.call(this))
    this.controlLayer.appendChild(image);
  }

  nextStep(){
    this.step += 1;
    this.buildStep();
  }

  prevStep(){
    this.step -= 1;
    this.buildStep();
  }

  buildTrainingIcons(type, max){
    const div = document.createElement('div');
    div.className = 'elements-container';

    for (let i = 1; i <= max; i++){
      const image = document.createElement('img');
      image.src = '/static/images/elements/' + type + '_' + i + '.png';
      div.appendChild(image)
    }

    this.controlLayer.appendChild(div);
  }

  buildStepBody(){
    if (this.step === 0){
      this.buildText('Сегодня ты — предприниматель. Твоя задача — как можно быстрее вырастить свой бизнес', 'game-training-text-body')
    }
    else if (this.step === 1){
      this.buildText('Лови полезные — инвестиции, вложения и деньги за покупки', 'game-training-text-body');
      this.buildTrainingIcons('good', 4)
    }
    else if (this.step === 2){
      this.buildText('Избегай мошенников и воров', 'game-training-text-body')
      this.buildTrainingIcons('bad', 2);
    }
    else if (this.step === 3){
      this.controlLayer.appendChild(this.buildButton('done', () => this.startGame.call(this)));
      this.buildText('У тебя есть только 2 минуты, следи за таймером сверху', 'game-training-text-body')
    }
  }

  buildStep(res){
    document.querySelector('.control-left')?.remove();
    document.querySelector('.control-right')?.remove();
    document.querySelector('.game-training-text-body')?.remove();
    document.querySelector('.elements-container')?.remove();

    if (this.step === 0) this.buildStepButton('right', this.nextStep);
    else if (this.step === this.max_step) {
      this.buildStepButton('left', this.prevStep);
    }
    else {
      this.buildStepButton('right', this.nextStep);
      this.buildStepButton('left', this.prevStep);
    }

    this.buildStepBody(res);
  }



  async buildTraining(){
    this.controlLayer.innerHTML = '';
    this.canvas.className = 'game'
    this.level = 1;
    await this.renderCanvasImage(this.getHousePath(this.level), [(this.width / 2 - 125), this.height - 472, 250, 150])
    this.refreshSoundIcon();
    this.buildStep()
  }
}