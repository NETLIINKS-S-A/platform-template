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

/* --------------------------------------
  DATE AND TIME
 -------------------------------------- */
/*
  Get the month an date objects
  from HTML  
*/
const UImonth = document.getElementById('UImonth');
const UIdate = document.getElementById('UIdate');
if (UImonth) {
  // Creating date object
  const $D = new Date();
  // Get the current day
  let day = $D.getDay();
  // Get the current month
  let month = $D.getMonth();
  // Get the current date
  let date = $D.getDate();
  // Change month name depending of the number
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
  // Change day name depending of the number
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
  // Write the current date into HTML
  UImonth.innerHTML = month;
  UIdate.innerHTML = `${day} ${date}`;
}

/* --------------------------------------
  TABLE STATUS
----------------------------------------- */
// Get the status from HTML
const statusDOM = document.querySelectorAll('#tableStatus');
// Index all status item to change class
for (let i = 0; i < statusDOM.length; i++) {
  // Add the base status to tableStatus
  statusDOM[i].classList.add('table__status');
  // Get the text content from status to choose status type
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

/* --------------------------------------
 DROPDOWNS
----------------------------------------- */

//Get all dropdowns from the document
const dropdowns = document.querySelectorAll('.dropdown');

// Loop through al dropdown elements
dropdowns.forEach((dropdown) => {
  // Get inner lements from each dropdown
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');

  /*
    We are using this method in order to have
    multiple dropdowns menus on the page work
  */

  // Add a click event to the select element
  select.addEventListener('click', ()=> {
    // Add the clicked select styles to the select element
    select.classList.toggle('select--isClicked');
    // Add the rotate styles to the caret element
    caret.classList.toggle('caret--isRotate');
    // Add the open styles to the menu element
    menu.classList.toggle('menu--isOpen');
  });

  // Loop through all option elements
  options.forEach((option)=> {
    // Add a click event to the option element
    option.addEventListener('click', ()=> {
      // Change selected inner text to clicked option inner text
      selected.innerText = option.innerText;
      // Add the clicked select styles to the select element
      select.classList.remove('select--isClicked');
      // Add the rotate styles to the caret element;
      caret.classList.remove('caret--isRotate');
      // Add the open styles to the menu element
      menu.classList.remove('menu--isOpen');
      // Remove active class from all option elements
      options.forEach((option) => {
        option.classList.remove('active');
      });
      // Add active class to clicked option element
      option.classList.add('active');
    });
  });
});

/* --------------------------------------
 MENU DROPDOWNS
----------------------------------------- */
// Get all menu dropdowns from the document
const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion) => {
  
  accordion.addEventListener('click', ()=> {
    const accordionContent = accordion.nextElementSibling;
    accordionContent.classList.toggle('accordion__isOpen');
    accordion.classList.toggle('accordion__isActive');
  })
});
