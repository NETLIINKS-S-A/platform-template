const url = 'https://backend.netliinks.com:443/';
/* ===================================================
  Get the access token from the login form
  and make the login request to the API
  =================================================== */
async function login(acc_token) {
  let theaders = new Headers();
  theaders.append("Authorization", `Bearer ${acc_token}`);
  theaders.append("Cookie", "JSESSIONID=B108DD58E91AB58DB0D646212D441248");

  const options = {
    method: 'GET',
    headers: theaders,
    redirect: 'follow'
  }

  fetch(`${url}rest/entities/Business/`, options)
    .then((response) => response.json())
    .then((datas) => {
      renderSidebar();
      // open as default
      renderBusiness(acc_token)
    })
}

/* ===================================================
  Get the Bearer token from the login form
  and pass it to the getAPILogin function
  =================================================== */
async function getToken(user, password) {
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

  // Authorize the user and get the token
  let fetchData = await fetch(`${url}oauth/token`, options)
    .then((response) => response.json())
    .then((data)=> {
      // Save token to localStorage
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('loginStatus', true);
      login(data.access_token);
    }).catch((error) => console.error(error))
}

loginButton.addEventListener('click', (e)=> {
  e.preventDefault();
  getToken(username.value, password.value);
});


function startSessionAutomatically() {
  const keylogin = localStorage.getItem('token');
  const loginStatus = localStorage.getItem('loginStatus');

  if (keylogin != null) {
    console.log(keylogin);
    login(keylogin)
  } else {
    console.log('the keylogin is null')
  }
}

startSessionAutomatically();
