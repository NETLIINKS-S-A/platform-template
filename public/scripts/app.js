const url = 'https://backend.netliinks.com:443/';
const $login = document.getElementById('login');
const loginButton = document.getElementById('loginButton');
const username = document.getElementById('email');
const password = document.getElementById('password');

const $document = document.getElementById('pageContent');

/*
If login correctly enter this data
to the document
*/
function renderSidebar(data) {
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

/*
  Get the access token from the login form
  and make the login request to the API
*/
async function getAPILogin(acc_token) {
  let theaders = new Headers();
  theaders.append("Authorization", `Bearer ${acc_token}`);
  theaders.append("Cookie", "JSESSIONID=B108DD58E91AB58DB0D646212D441248");

  let fetchData = await fetch(`${url}rest/entities/User/`, {
    method: 'GET',
    headers: theaders,
    redirect: 'follow'
  }).then((response) => response.json())
    .then((data)=> {
      console.table(data);

      // Render sidebar if login is successful
      renderSidebar('fetchData');
    });
}

/*
  Get the Bearer token from the login form
  and pass it to the getAPILogin function
*/
async function getKEY(user, password) {
  let headerList = {
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS)",
    "Authorization": "Basic YzNjMDM1MzQ2MjoyZmM5ZjFiZTVkN2IwZDE4ZjI1YmU2NDJiM2FmMWU1Yg==",
    "Content-Type": "application/x-www-form-urlencoded"
  }

  const options = {
    method: 'POST',
    body: `grant_type=password&username=${user}&password=${password}`,
    headers: headerList,
  }

  let fetchData = await fetch(`${url}oauth/token`, options)
    .then((response) => response.json())
    .then((data)=> {
      // Get the key from the response
      if (data.access_token) {
        getAPILogin(data.access_token);
      } else {
        openModal('loginErrorModal');
      }

    }).catch((error) => console.error(error))
}

loginButton.addEventListener('click', (e)=> {
  e.preventDefault();
  getKEY(username.value, password.value);
});
