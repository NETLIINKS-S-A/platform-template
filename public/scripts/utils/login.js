const renderUI = ()=> {
  console.log('UI has been rendered');
  renderSidebar();
}


// let user;
// let password;

// const url = 'https://backend.netliinks.com:443/';
// /* ===================================================
//   Get the access token from the login form
//   and make the login request to the API
//   =================================================== */
// let sessionToken = localStorage.getItem('token');
// const loginStatus = localStorage.getItem('loginStatus');

// async function getAccess(t) {
//   let theaders = new Headers();
//   theaders.append("Authorization", `Bearer ${t}`);
//   theaders.append("Cookie", "JSESSIONID=B108DD58E91AB58DB0D646212D441248");

//   const options = {
//     method: 'GET',
//     headers: theaders,
//     redirect: 'follow'
//   }

//   return options;
  
//   renderUI(t)
// }

// async function renderUI(t) {
//   let options = getAccess(t);
  
//   fetch(`${url}rest/entities/Business/`, options)
//     .then((response) => response.json())
//     .then((datas) => {
//       renderSidebar();
//     });
// }


// loginButton.addEventListener('click', (e)=> {
//   e.preventDefault();
//   getToken($d.email.value, $d.password.value);
// });


// function startSessionAutomatically(t) {
//   if (t != null && loginStatus == 'true') {
//     renderUI(t)
//   } else {
//     console.error('Error al iniciar sesión')
//   }
// }

// startSessionAutomatically(sessionToken);
