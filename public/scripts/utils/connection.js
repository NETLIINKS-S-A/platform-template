const headerList = {
  "Accept": "application/json",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS)",
  "Authorization": "Basic YzNjMDM1MzQ2MjoyZmM5ZjFiZTVkN2IwZDE4ZjI1YmU2NDJiM2FmMWU1Yg==",
  "Content-Type": "application/x-www-form-urlencoded"
}

const cndt = {
  url: 'https://backend.netliinks.com:443/',
  token: localStorage.getItem('token'),
  status: localStorage.getItem('status'),
  user: 'admin',
  password: 'password2020',
}

/**
 * getAccessToken es ejecutado por el botón de login
 * para obtener el token de acceso.
 * 
 * Obtiene los datos de acceso de los inputs del formulario de login a travez de sus parámetros "user" y "password".
 * 
 * @param {string} user
 * @param {string} password
*/
function getAccessToken(user, password) {
  const options = {
    method: 'POST',
    body: `grant_type=password&username=${user}&password=${password}`,
    headers: headerList,
  }

  /*
    Obtenemos el token de acceso a traves del login
    y lo guardamos en el localStorage
  */
  fetch(`${cndt.url}oauth/token`, options)
    .then((res) => res.json())
    .then((data) => {
      // Si los datos son correctos, almacena el token en localStorage
      localStorage.setItem('token', data.access_token);
      console.log(data);
      if (cndt.token == 'undefined'){
        console.log('incorrect credentials');
      } else {
        renderUI();
      }
    })
    .catch((error) => {
      cndt.token = undefined;
      console.table(error);
    })

  console.log(options)
}


getAccessToken('admin', 'password2020');
