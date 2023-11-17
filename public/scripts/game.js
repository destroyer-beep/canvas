(async function(){
  const game = document.querySelector('#game');
  const canvas = document.querySelector('#canvas');
  const controlLayer = document.querySelector('#control-layer');
  const context = canvas.getContext("2d");

  const coordinator = new GameCoordinator(context, controlLayer, canvas);
  await coordinator.buildStartWindow(controlLayer);

  if (!localStorage.getItem('training')) {
    await coordinator.buildTraining();
  }
  else {
    coordinator.startGame()
  }

})();