const $login = {
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  button: document.getElementById('loginButton'),
}

const headerList = {
  "Accept": "application/json",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS)",
  "Authorization": "Basic YzNjMDM1MzQ2MjoyZmM5ZjFiZTVkN2IwZDE4ZjI1YmU2NDJiM2FmMWU1Yg==",
  "Content-Type": "application/x-www-form-urlencoded"
}

/**
 * **login():** Obtiene el token de acceso para iniciar sesión.
 * 
 * Obtiene los datos de acceso de los inputs del formulario de 
 * login a travez de sus parámetros "user" y "password".
 * 
 * @param {string} user
 * @param {string} password
*/
async function login(user, password) {
  const options = {
    method: 'POST',
    body: `grant_type=password&username=${user}&password=${password}`,
    headers: headerList,
  }

  /*
    Obtenemos el token de acceso a traves del login
    y lo guardamos en el localStorage
  */
  await fetch(`${cnd.url}oauth/token`, options)
    .then((res) => res.json())
    .then((data) => {
      // Si los datos son correctos, almacena el token en localStorage
      localStorage.setItem('token', data.access_token);
      
      setTimeout(() => {
        if (cnd._token == 'undefined'){
          console.log('incorrect credentials');
        } else {
          renderUI(cnd._token);
          window.location.reload();
        }
      }, 400);
    })
    .catch((error) => {
      cnd._token = undefined;
      console.table(error.error);
    })
}

/*
  Inicia sesión automáticamente al entrar a la plataforma
  TODO: esto puede ser opcional
*/
async function startSessionAutomatically(token) {
  if (token == 'undefined'){
    $d.doc.classList.remove('content--isVisible');
    $d.login.classList.add('login--isVisible');
  } else {
    renderUI();
  }
}

/**
 * **renderUI:** renderiza la interfáz de usuario
 * @param {string} token obtiene el token para iniciar sesión 
*/
function renderUI(tkn) {
  $d.doc.classList.add('content--isVisible');
  $d.login.classList.remove('login--isVisible');
  renderSidebar();
  renderBusiness(tkn);
}
// Inicia sesión con los datos de acceso del formulario de login
$login.button.addEventListener('click', (evnt)=> {
  evnt.preventDefault();
  login($login.email.value, $login.password.value);
});

if (cnd._token !== 'undefined'){
  startSessionAutomatically(cnd._token);
}

function logOut() {
  cnd._token = localStorage.setItem('token', undefined);
  $d.doc.classList.remove('content--isVisible');
  $d.login.classList.add('login--isVisible');
}
