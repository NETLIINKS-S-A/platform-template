/* --------------------------------------
MODAL WINDOWS
 -------------------------------------- */
function openModal(m) {
  const modal = document.getElementById(m);
  modal.style.display = 'block';
  setTimeout(()=>{
    modal.classList.toggle('open');
  }, 100)
}

function closeModal(m) {
  const modal = document.getElementById(m);
  modal.classList.toggle('open');
  setTimeout(()=>{
    modal.style.display = 'none';
  }, 250)
}

console.clear();

/* --------------------------------------
  DATE AND TIME
 -------------------------------------- */
const UImonth = document.getElementById('UImonth');
const UIdate = document.getElementById('UIdate');
const $D = new Date();

let day = $D.getDay();
let month = $D.getMonth();
let date = $D.getDate();

// Month name
switch (month) {
  case 0:
    month = 'Enero'
  break;

  case 1:
    month = 'Febrero'
  break;

  case 2:
    month = 'Marzo'
  break;

  case 3:
    month = 'Abril'
  break;

  case 4:
    month = 'Mayo'
  break;

  case 5:
    month = 'Junio'
  break;

  case 6:
    month = 'Julio'
  break;

  case 7:
    month = 'Agosto'
  break;

  case 8:
    month = 'Septiembre'
  break;

  case 9:
    month = 'Octubre'
  break;

  case 10:
    month = 'Noviembre'
  break;

  case 11:
    month = 'Diciembre'
  break;
}
// Day names
switch (day) {
  case 0:
    day = 'Domingo';
  break;

  case 1:
    day = 'Lunes';
  break;

  case 2:
    day = 'Martes';
  break;

  case 3:
    day = 'Miércoles';
  break;

  case 4:
    day = 'Jueves';
  break;

  case 5:
    day = 'Viernes';
  break;

  case 6:
    day = 'Sábado';
  break;
}

UImonth.innerHTML = month;
UIdate.innerHTML = `${day} ${date}`;

/* --------------------------------------
 TABLE STATUS
 -------------------------------------- */
const statusDOM = document.querySelectorAll('#tableStatus');

for (let i = 0; i < statusDOM.length; i++) {
  // ADD BASIC STYLE TO STATUS
  statusDOM[i].classList.add('table__status');

  const status = statusDOM[i].innerHTML;
  if (status == 'confirmado' | status == 'Confirmado') {
    statusDOM[i].classList.add('table__status--c');
  } else if (status == 'I' | status == 'i') {
    statusDOM[i].classList.add('table__status--i');
    statusDOM[i].innerHTML = 'Inactivo'
  } else if (status == 'A' | status == 'a') {
    statusDOM[i].classList.add('table__status--a');
    statusDOM[i].innerHTML = 'Activo'
  }
}
