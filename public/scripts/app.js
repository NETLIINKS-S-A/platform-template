/*
  Login Data
  get data from login form

*/
let loginStatus = false;

async function connection(userData, userPassword) {
  const URL = 'https://backend.netliinks.com:443/oauth/token';
  let getData;
  
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Authorization": "Basic YzNjMDM1MzQ2MjoyZmM5ZjFiZTVkN2IwZDE4ZjI1YmU2NDJiM2FmMWU1Yg==",
    "Content-Type": "application/x-www-form-urlencoded"
   }

  const options = {
    method: 'POST',
    body: `grant_type=password&username=${userData}&password=${userPassword}`,
    headers: headersList
  }

  let fetchData = await fetch(URL, options)
  .then((response) => response.json())
  .then((data)=> {
    getData = data
    console.log(getData);
  })
  .catch((error) => console.log(error))
}

const loginButton = document.getElementById('loginButton');
let username = document.getElementById('email');
let password = document.getElementById('password');

// An user to demonstration

function showMesage(callback) {
  return callback;
  console.log(callback);
}

loginButton.addEventListener('click', (e)=> {
  e.preventDefault();
  let value = connection(username.value, password.value);
})

