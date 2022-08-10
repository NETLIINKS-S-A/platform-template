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
