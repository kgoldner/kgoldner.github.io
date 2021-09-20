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
    var new_href = 'dark.css';

    if (href == 'dark.css') {
        new_href = 'update.css';
    }

    document.getElementById('theme').setAttribute('href', new_href);
        localStorage.setItem("sheet", new_href);
}

/*window.onload = _ =>
    let href = localStorage.getItem("sheet") || "dark.css";
    document.getElementById('theme').setAttribute('href', href);*/