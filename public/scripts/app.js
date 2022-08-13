const $d = {
  login: document.getElementById('login'), // Login Window
  password: document.getElementById('password'), // Password input
  interactions: document.getElementById('interactions'), // Interactions container
  doc: document.getElementById('pageContent'), // Document container
  dataContent: document.getElementById('userDataContent'), // Data content container
  sidebar: document.getElementById('sidebar'), // Sidebar container
}

/*
If login correctly enter this data
to the document
*/
async function renderSidebar() {
  // SIDEBAR CONTENT
  $d.sidebar.innerHTML = `
    <!-- MENUBAR -->
    <div class="header">
      <h6>Netguard</h6>
      <span>Poll Castillo</span>
    </div>

    <ul class="menu">
      <li class="menu__item">
        <i class="fa-solid fa-building"></i>
        <span class="text" onclick="renderBusiness(cnd._token)">Empresas</span>
      </li>

      <li class="menu__item">
        <i class="fa-solid fa-apartment"></i>
        <span class="text" onclick="renderCitadels(cnd._token)">Ciudadelas</span>
      </li>

      <li class="menu__item">
        <div class="accordion">
          <i class="fa-solid fa-user-group"></i>
          <span class="text">Usuarios</span>
        </div>
        <ul class="accordion__content">
          <li>
            <i class="fa-solid fa-person-military-pointing"></i>
            <span class="text" onclick="renderGuards(cnd._token)">Guardias</span>
          </li>

          <li>
            <i class="fa-solid fa-user"></i>
            <span class="text" onclick="renderClients(cnd._token)">Clientes</span>
          </li>

          <li>
            <i class="fa-solid fa-siren"></i>
            <span class="text" onclick="renderCitadels(cnd._token)">Emergencia</span>
          </li>
        </ul>
      </li>

      <li class="menu__item">
        <div class="accordion">
          <i class="fa-solid fa-book"></i>
          <span class="text">Bitácora</span>
        </div>
        <ul class="accordion__content">
          <li>
            <i class="fa-solid fa-calendar-exclamation"></i>
            <span class="text">Eventos</span>
          </li>

          <li>
            <i class="fa-solid fa-browsers"></i>
            <span class="text">Plataformas</span>
          </li>

          <li>
            <i class="fa-solid fa-user"></i>
            <span class="text">Visitas</span>
          </li>

          <li>
            <i class="fa-solid fa-note"></i>
            <span class="text">Notas</span>
          </li>
        </ul>
      </li>

      <li class="menu__item">
        <div class="accordion">
          <i class="fa-solid fa-up-from-bracket"></i>
          <span class="text">importar</span>
        </div>
        <ul class="accordion__content">
          <li>
            <i class="fa-solid fa-person-military-pointing"></i>
            <span class="text">Guardias</span>
          </li>

          <li>
            <i class="fa-solid fa-user"></i>
            <span class="text">Clientes</span>
          </li>
        </ul>
      </li>

      <li class="menu__item">
        <i class="fa-solid fa-hammer"></i>
        <span class="text">Superusuarios</span>
      </li>

      <li class="menu__item">
        <i class="fa-solid fa-hammer"></i>
        <span class="text" onclick="logOut()">Serrar sesión</span>
      </li>
    </ul>
  `;  

  accordion();
}

async function renderBusiness() {
  let title = 'Empresas';
  let content = `
    <header class="page-header">
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

      <h3 class="section__header">${title}</div></h3>
    </header>

    <div class="table__container">
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
    </div>
    
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

  $d.dataContent.innerHTML = content;
  dateAndTime();

  await fetch(`${cnd.url}rest/entities/Business`, options)
    .then((response) => response.json())
    .then((datas) => {
      const tableBody = document.getElementById('tableBody');
      console.log(cnd.url)
      let businessData = datas.map((data)=> {
        let date = reDate(data);
        let time = reTime(data);

        return ` 
          <tr class="business">
            <td>${data.name}</td>
            <td>${data.createdBy}</td>
            <td>${date}</td>
            <td>${time}</td>
          </tr>
        `;
      })

      tableBody.innerHTML = businessData.join('');
    }).catch((error) => {
      /* Al ser la primera función, verifica si no hay
        error, de existir un error, cierra la sesión.
      */
      localStorage.setItem('loginStatus', false);
    })
}

async function renderCitadels() {
  let title = 'Ciudadelas';
  let content = `
    <header class="page-header">
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

      <h3 class="section__header">${title}</div></h3>
    </header>

    <div class="table__container">
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Creado por</th>
            <th>Id</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        
        <tbody id="tableBody"></tbody>
      </table>
    </div>
    
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

  $d.dataContent.innerHTML = content;
  dateAndTime();

  await fetch(`${cnd.url}rest/entities/Citadel`, options)
    .then((response) => response.json())
    .then((datas) => {
      const tableBody = document.getElementById('tableBody');
      let businessData = datas.map((data)=> {
        let date = reDate(data);
        let time = reTime(data);

        return ` 
        <tr class="business">
          <td>${data.description}</td>
          <td>${data.createdBy}</td>
          <td>${data.name}</td>
          <td>${date}</td>
          <td>${time}</td>
        </tr>
        `;
      })

      tableBody.innerHTML = businessData.join('');
    });
    tableTime();
}

async function renderGuards() {
  let title = 'Guardias';
  let content = `
    <header class="page-header">
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

      <h3 class="section__header"><div class="breadcrumb"><span>Usuarios/</span><span class="active">${title}</span></div></h3>
    </header>

    <div class="table__container">
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        
        <tbody id="tableBody"></tbody>
      </table>
    </div>
    
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

  $d.dataContent.innerHTML = content;
  dateAndTime();

  await fetch(`${cnd.url}rest/entities/User`, options)
    .then((response) => response.json())
    .then((datas) => {
      const tableBody = document.getElementById('tableBody');
      console.log(datas)

      let businessData = datas.map((data)=> {
        let status;
        data.active === true ? status = 'Activo' : status = 'Inactivo';

        if(data.userType === 'GUARD') {
          let date = reDate(data);
          let time = reTime(data);

          return `
          <tr class="business">
            <td>${data.firstName} ${data.lastName}</td>
            <td>${status}</td>
            <td>${date}</td>
            <td>${time}</td>
          </tr>`;
        }
      })

      tableBody.innerHTML = businessData.join('');
    });
    // Get and write the current time into header
    tableTime();
}

async function renderClients() {
  let title = 'Clientes';
  let content = `
    <header class="page-header">
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

      <h3 class="section__header"><div class="breadcrumb"><span>Usuarios/</span><span class="active">${title}</span></div></h3>
    </header>

    <div class="table__container">
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        
        <tbody id="tableBody"></tbody>
      </table>
    </div>
    
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

  $d.dataContent.innerHTML = content;
  dateAndTime();

  await fetch(`${cnd.url}rest/entities/User`, options)
    .then((response) => response.json())
    .then((datas) => {
      const tableBody = document.getElementById('tableBody');

      let businessData = datas.map((data)=> {
        let date = reDate(data);
        let time = reTime(data);

        let status;
        data.active === true ? status = 'Activo' : status = 'Inactivo';

        if(data.userType === 'CUSTOMER') {
          return `
          <tr class="business">
            <td>${data.firstName} ${data.lastName}</td>
            <td>${data.phone}</td>
            <td>${status}</td>
            <td>${date}</td>
            <td>${time}</td>
          </tr>`;
        }
      })

      tableBody.innerHTML = businessData.join('');
    });
    
    tableTime();
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
