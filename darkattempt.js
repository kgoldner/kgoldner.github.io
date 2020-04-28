/*
function swapStyleSheet(sheet){
  document.getElementById('theme').setAttribute('href', sheet);
  localStorage.setItem("sheet", sheet);
}

window.onload = _ =>
 swapStyleSheet(
  localStorage.getItem("sheet") || "default.css"
 );
 */
 
function swapStyleSheet(){
    var href = document.getElementById('theme').getAttribute('href');
    var new_href = 'update.css';

    if (href == 'updated.css') {
        new_href = 'darkmode.css';
    }

    document.getElementById('theme').setAttribute('href', new_href);
        localStorage.setItem("sheet", new_href);
    }

window.onload = _ =>
    swapStyleSheet();