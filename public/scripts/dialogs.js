function dialogObject(context){

  function createSpan(text, className){
    const span = document.createElement('span');
    span.textContent = text;
    span.className = className
    return span;
  }

  function createDialog(textHeader, textBody){
    const div = document.createElement('div')
    div.className = 'game-dialog';
    const span = createSpan(textHeader, 'game-dialog-text_header');
    const spanBody = createSpan(textBody, 'game-dialog-text_body')


    div.append(span);
    div.append(spanBody);
    context.append(div);
  }

  return {
    createDialog,
  }
}