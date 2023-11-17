function buttonsObject(ctx){
  const context = ctx;
  const buttonBackground = new Image();
  buttonBackground.src = '/static/images/buttons/button.svg';

  function isButtonClicked(){

  }

  function createButton(text, callback, coords){
    return () => {
      context.drawImage(buttonBackground, ...coords);
      context.addEventListener('click', callback, coords)
    }
  }

  return new Promise((res, rej) => {
    buttonBackground.onload = () => res(
      {
        createButton,
      }
    )
  })
}