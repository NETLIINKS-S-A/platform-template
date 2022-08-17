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
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Super</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Opciones</th>
          </tr>
        </thead>
        
        <tbody id="tableBody"></tbody>
      </table>
    </div>
    `;

  $d.dataContent.innerHTML = content;

  await fetch(`${cnd.url}rest/entities/User`, options)
    .then((response) => response.json())
    .then((datas) => {
      const tableBody = document.getElementById('tableBody');
      let businessData = datas.map((data)=> {
        let status;
        data.active === true ? status = 'Activo' : status = 'Inactivo';

        if(data.userType === 'GUARD') {
          let date = reDate(data);
          let time = reTime(data);
          let name = data.firstName + ' ' + data.lastName;
          let SU = data.isSuper;
          
          if (SU === true) {
            SU = '<i class="fa-solid fa-lock-keyhole-open"></i>'
          } else if (SU === false) {
            SU = '<i class="fa-solid fa-lock-keyhole"></i>'
          } else {
            SU = '<i class="fa-solid fa-ban"></i>'
          }

          return `
          <tr class="business">
            <td>${name}</td>
            <td>${data.phone}</td>
            <td><span id="tableStatus">${status}</span></td>
            <td>${SU}</td>
            <td>${date}</td>
            <td>${time}</td>

            <td>
              <button class="button button__icon button__small button__primary" onclick="userDetails('guard')">
                <i class="fa-solid fa-list"></i>
              </button>
            </td>
          </tr>
          
          <div class="modal" id="guard">
            <div class="modal__dialog modal__body">
              <h2 class="modal__title">Detalles</h2>

              <p>nombre: ${name}</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro magni, quae est fugiat modi assumenda ratione saepe nostrum ab rerum eveniet labore consectetur voluptatibus explicabo id autem, qui repudiandae quidem.</p>

              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus voluptas facilis minus dicta quibusdam quod tempore aperiam dolor nobis quis omnis officia excepturi obcaecati, rem animi sed eligendi suscipit sapiente.</p>

              <div class="modal__footer">
                <button class="button button__primary" onclick="closeModal('guard')">Aceptar</button>
                <button class="button" onclick="closeModal('guard')">cancelar</button>
              </div>
            </div>
          </div>
          
          `;
        }
      })

      tableBody.innerHTML = businessData.join('');
    });

    dateAndTime();
    // Get and write the current time into header
    tableTime();
    tableStatus();
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
            <th>Super</th>
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

  await fetch(`${cnd.url}rest/entities/User`, options)
    .then((response) => response.json())
    .then((datas) => {
      const tableBody = document.getElementById('tableBody');

      let businessData = datas.map((data)=> {
        let date = reDate(data);
        let time = reTime(data);

        let status;
        let isSuper;
        data.active === true ? status = 'Activo' : status = 'Inactivo';
        data.isSuper === true ? isSuper = '<i class="fa-solid fa-lock-keyhole-open"></i>' : isSuper = '<i class="fa-solid fa-lock-keyhole"></i>';

        if(data.userType === 'CUSTOMER') {
          return `
          <tr class="business">
            <td>${data.firstName} ${data.lastName}</td>
            <td>${data.phone}</td>
            <td><span id="tableStatus">${status}</span></td>
            <td><span>${isSuper}</span></td>
            <td>${date}</td>
            <td>${time}</td>
          </tr>`;
        }
      })

      tableBody.innerHTML = businessData.join('');
    });

    dateAndTime();
    tableStatus();
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

// fetch('https://backend.netliinks.com:443/rest/entities/Customer?fetchPlan=full', options)
//   .then((res) => res.json())
//   .then((data) => {
//     console.table(data)
//   })

function userDetails(type) {
  console.log(type);
  const modal = document.getElementById(type);
  modal.style.display = 'block';
  
  setTimeout(()=>{
    modal.classList.toggle('open');
  }, 100)
}

function showBusiness(type, id) {
  console.log(type);
  const modal = document.getElementById(type);
  modal.style.display = 'block';
  
  setTimeout(()=>{
    modal.classList.toggle('open');
  }, 100)

  console.log(id)
}
