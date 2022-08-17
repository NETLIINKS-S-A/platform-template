const $d = {
  login: document.getElementById('login'), // Login Window
  password: document.getElementById('password'), // Password input
  interactions: document.getElementById('interactions'), // Interactions container
  doc: document.getElementById('pageContent'), // Document container
  dataContent: document.getElementById('userDataContent'), // Data content container
  sidebar: document.getElementById('sidebar'), // Sidebar container
}

/**
 * Renderiza el menú de usuario
 * 
 * @trhows RenderBusiness
 * @trhows RenderCitadels
 * @trhows RenderGuards
 * @trhows RenderClients
 * @trhows RenderCitadels
 * @trhows LougOut
*/
async function RenderSidebar() {
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
        <span class="text" onclick="RenderBusiness(cnd._token)">Empresas</span>
      </li>

      <li class="menu__item">
        <i class="fa-solid fa-apartment"></i>
        <span class="text" onclick="RenderCitadels(cnd._token)">Ciudadelas</span>
      </li>

      <li class="menu__item">
        <div class="accordion">
          <i class="fa-solid fa-user-group"></i>
          <span class="text">Usuarios</span>
        </div>
        <ul class="accordion__content">
          <li>
            <i class="fa-solid fa-person-military-pointing"></i>
            <span class="text" onclick="RenderGuards(cnd._token)">Guardias</span>
          </li>

          <li>
            <i class="fa-solid fa-user"></i>
            <span class="text" onclick="RenderClients(cnd._token)">Clientes</span>
          </li>

          <li>
            <i class="fa-solid fa-siren"></i>
            <span class="text" onclick="RenderCitadels(cnd._token)">Emergencia</span>
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
        <span class="text" onclick="LogOut()">Serrar sesión</span>
      </li>
    </ul>
  `;  
  
  // helper: ejecuta las acciones del acordión del sidebar
  accordion();
}

/**
 * Renderiza la tabla de empresas
 * 
 * obtiene los datos del servidor y los renderiza en la tabla.
 * @throws DateAndTime
*/
async function RenderBusiness() {
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
          <button class="button button__primary button__icon" onclick="modal.open('businessDetail')">
            <i class="fa-solid fa-plus"></i>
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
            <th>Opciones</th>
          </tr>
        </thead>
        
        <tbody id="tableBody"></tbody>
      </table>
    </div>
    
    <!-- MODALS -->
    <div class="modal" id="businessDetail">
      <div class="modal__dialog modal__body">
        <h2 class="modal__title" id="modalTitle">Detalles</h2>

        <p><b>Creado por:</b> <span id="creator"></span></p>
        <p><b>Fecha de creación:</b> <span id="creationDate"></span></p>
        <p><b>Fecha de modificación:</b> <span id="modificationDate"></span></p>

        <div class="modal__footer">
          <button class="button button__primary" onclick="modal.close('businessDetail')">Aceptar</button>
        </div>
      </div>
    </div>`;

  // Escribe la interfaz en el documento
  $d.dataContent.innerHTML = content;
  DateAndTime();

  await fetch(`${cnd.url}rest/entities/Business`, options)
    .then((response) => response.json())
    .then((datas) => {

      const rows = document.getElementById('tableBody');
      datas.forEach((data) => {
        // Datos convertidos a variables
        let name = data.name;
        let id = data.id;
        let creator = data.createdBy;
        let date = reDate(data);
        let time = reTime(data);

        rows.innerHTML += `
          <tr>
            <td>${name}</td>
            <td>${creator}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td>
              <button class="button button__small button__icon button__primary" onclick="RenderBusinessDetails('businessDetail', '${id}')">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </td>
          </tr>
          `;
      })
    });
}

/**
 * Lanza un modal con la información de la empresa seleccionada.
 * @var modalTitle {string} - Titulo del modal
 * @var creator
 * @var creationDate
 * @var modifictionDate
 * @throws modal.open
*/
async function RenderBusinessDetails(id, datatable) {
  modal.open(id);
  
  await fetch(`${cnd.url}rest/entities/Business/${datatable}`, options)
    .then((res) => res.json())
    .then((datas) => {
      const modalTitle = document.getElementById('modalTitle');
      const creator = document.getElementById('creator');
      const creationDate = document.getElementById('creationDate');
      const modificationDate = document.getElementById('modificationDate');

      let initDate = reDate(datas);
      let modDate = reDate(datas);

      modalTitle.innerHTML = datas._instanceName;
      creator.innerHTML = datas.createdBy;
      creationDate.innerHTML = initDate;
      modificationDate.innerHTML = modDate;
    }).catch((err) => {
      console.log(err)
    })
}
