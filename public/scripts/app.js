const $login = document.getElementById('login');
const loginButton = document.getElementById('loginButton');
const username = document.getElementById('email');
const password = document.getElementById('password');
const interactions = document.getElementById('interactions');
const $document = document.getElementById('pageContent');

/*
If login correctly enter this data
to the document
*/
function renderSidebar() {
  $document.classList.add('content--isVisible');
  $login.classList.remove('login--isVisible');
  const sidebar = document.getElementById('sidebar');
  
  // SIDEBAR CONTENT
  sidebar.innerHTML = `
    <!-- MENUBAR -->
    <div class="header">
      <h6>Netguard</h6>
      <span>Poll Castillo</span>
    </div>
    <ul class="menu">
      <li class="menu__item">
        <i class="fa-solid fa-gauge"></i>
        <span class="text">Dashboard</span>
      </li>

      <li class="menu__item">
        <i class="fa-solid fa-building"></i>
        <span class="text" onclick="loadBusiness(data)">Empresas</span>
      </li>

      <li class="menu__item">
        <div class="accordion">
          <i class="fa-solid fa-user-group"></i>
          <span class="text">Usuarios</span>
        </div>
        <ul class="accordion__content">
          <li><a href="#">
            <i class="fa-solid fa-person-military-pointing"></i>
            <span class="text">Guardias</span>
          </a></li>

          <li><a href="#">
            <i class="fa-solid fa-user"></i>
            <span class="text">Clientes</span>
          </a></li>

          <li><a href="#">
            <i class="fa-solid fa-siren"></i>
            <span class="text">Emergencia</span>
          </a></li>
        </ul>
      </li>

      <li class="menu__item">
        <div class="accordion">
          <i class="fa-solid fa-book"></i>
          <span class="text">Bitácora</span>
        </div>
        <ul class="accordion__content">
          <li><a href="#">
            <i class="fa-solid fa-calendar-exclamation"></i>
            <span class="text">Eventos</span>
          </a></li>

          <li><a href="#">
            <i class="fa-solid fa-browsers"></i>
            <span class="text">Plataformas</span>
          </a></li>

          <li><a href="#">
            <i class="fa-solid fa-user"></i>
            <span class="text">Visitas</span>
          </a></li>

          <li><a href="#">
            <i class="fa-solid fa-note"></i>
            <span class="text">Notas</span>
          </a></li>
        </ul>
      </li>

      <li class="menu__item">
        <i class="fa-solid fa-apartment"></i>
        <span class="text">Ciudadela</span>
      </li>

      <li class="menu__item">
        <div class="accordion">
          <i class="fa-solid fa-up-from-bracket"></i>
          <span class="text">importar</span>
        </div>
        <ul class="accordion__content">
          <li><a href="#">
            <i class="fa-solid fa-person-military-pointing"></i>
            <span class="text">Guardias</span>
          </a></li>

          <li><a href="#">
            <i class="fa-solid fa-user"></i>
            <span class="text">Clientes</span>
          </a></li>
        </ul>
      </li>

      <li class="menu__item">
        <i class="fa-solid fa-hammer"></i>
        <span class="text">Superusuarios</span>
      </li>
    </ul>
  `;  

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
    });
  });
} // END SIDEBAR

function loadBusiness(data) {
  console.log(data)
}

