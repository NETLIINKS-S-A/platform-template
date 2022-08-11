const $login = document.getElementById('login');
const loginButton = document.getElementById('loginButton');
const username = document.getElementById('email');
const password = document.getElementById('password');
const interactions = document.getElementById('interactions');
const $document = document.getElementById('pageContent');
const $dataContent = document.getElementById('userDataContent');
const sessionToken = localStorage.getItem('token');
const sidebar = document.getElementById('sidebar');

/*
If login correctly enter this data
to the document
*/
function renderSidebar() {
  $document.classList.add('content--isVisible');
  $login.classList.remove('login--isVisible');
  
  // SIDEBAR CONTENT
  sidebar.innerHTML = `
    <!-- MENUBAR -->
    <div class="header">
      <h6>Netguard</h6>
      <span>Poll Castillo</span>
    </div>

    <ul class="menu">
      <li class="menu__item">
        <i class="fa-solid fa-building"></i>
        <span class="text" onclick="loadbusiness(sessionToken)">Empresas</span>
      </li>

      <li class="menu__item">
        <i class="fa-solid fa-apartment"></i>
        <span class="text">Ciudadelas</span>
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

async function loadbusiness(token) {
  let title = 'Empresas';
  let content = `
    <div class="hw">
      <div class="date">
        <span id="UImonth" class="UImonth"></span>
        <span id="UIdate" class="UIdate"></span>
      </div>

      <!-- tools -->
      <div class="tools">
        <div class="dropdown">
          <div class="select">
            <span class="selected">Empresa Demo 4</span>
            <div class="caret"></div>
          </div>
          <ul class="menu">
            <li>Empresa Demo 1</li>
            <li>Empresa Demo 2</li>
            <li>Empresa Demo 3</li>
            <li class="active">Empresa Demo 4</li>
            <li>Empresa Demo 5</li>
          </ul>
        </div>
        <button class="button" onclick="openModal('demoModal')">
          <span class="fa-solid fa-cat"></span>
        </button>
      </div>
    </div>

    <h3 class="section__header">${title}</h3>

    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Creado por</th>
          <th>Fecha</th>
          <th>Hora</th>
        </tr>
      </thead>
      
      <tbody id="tableBody"></tbody>
    </table>
    
    <!-- MODALS -->
    <div class="modal" id="demoModal">
      <div class="modal__dialog modal__body">
        <h2 class="modal__title">Modal</h2>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro magni, quae est fugiat modi assumenda ratione saepe nostrum ab rerum eveniet labore consectetur voluptatibus explicabo id autem, qui repudiandae quidem.</p>

        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus voluptas facilis minus dicta quibusdam quod tempore aperiam dolor nobis quis omnis officia excepturi obcaecati, rem animi sed eligendi suscipit sapiente.</p>

        <div class="modal__footer">
          <button class="button button__primary" onclick="closeModal('demoModal')">Aceptar</button>
          <button class="button" onclick="closeModal('demoModal')">cancelar</button>
        </div>
      </div>
    </div>
    `;

  $dataContent.innerHTML = content;
  dateAndTime();

  let theaders = new Headers();
  theaders.append("Authorization", `Bearer ${token}`);
  theaders.append("Cookie", "JSESSIONID=B108DD58E91AB58DB0D646212D441248");

  const options = {
    method: 'GET',
    headers: theaders,
    redirect: 'follow'
  }

  fetch(`${url}rest/entities/Business`, options)
    .then((response) => response.json())
    .then((datas) => {
      console.log(datas);
      const tableBody = document.getElementById('tableBody');
      let businessData = datas.map((data)=> {
        return ` 
        <tr class="business">
          <td>${data.name}</td>
          <td>${data.createdBy}</td>
          <td>${data.lastModifiedDate}</td>
          <td>${data.lastModifiedDate}</td>
        </tr>
        `;
      })

      tableBody.innerHTML = businessData.join('');
    });
}

// MODAL FUNCTIONS
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
