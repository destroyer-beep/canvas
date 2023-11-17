(async function(){
  const canvas = document.querySelector('#game-canvas');
  const gameContainer = document.querySelector('#game');

  canvas.width = gameContainer.offsetWidth;
  canvas.height = gameContainer.offsetHeight;

  const ctx = canvas.getContext("2d");

  ctx.addEventListener = function(event, callback, coords){
    document.querySelector('canvas').addEventListener(event, (e) => {
      const {layerX, layerY} = e;
      if (layerX >= coords[0] && layerX <= (coords[0] + coords[2]) && layerY >= coords[1] && layerY <= (coords[1] + coords[3])){
        callback();
      }
    })
  }

  const dialog = await dialogObject(ctx, {width: canvas.width, height: canvas.height});
  const buttons = await buttonsObject(ctx);


  dialog.createDialog(
    'Отправь «Экспертов» в космос!',
    buttons.createButton('Начать', () => console.log(1), [50, 50, 100, 100])
  )
  console.log(dialog)


})();