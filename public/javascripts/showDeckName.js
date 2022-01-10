window.addEventListener('DOMContentLoaded', (event) => {
    let deckNames=document.querySelectorAll('.deckName');
    let toolTip = document.createElement('div')
    toolTip.style.background = '#ddddel'
    toolTip.style.visibility = 'hidden'
    
    deckNames.forEach((elem)=>{addEventListener('mouseover',(event)=>{
        toolTip.style.left = event.clientX + 'px';
        toolTip.style.top = event.clientY-8 + 'px';
        toolTip.innerText = elem.innerText;
        toolTip.style.visibility = 'visible';
        })
    })

    deckNames.addEventListener('mouseout',(event)=>{
        toolTip.style.visibility = 'hidden';
    })
  });