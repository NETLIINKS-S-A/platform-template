// cnd = Connection Data
const cnd = {
  url: 'https://backend.netliinks.com:443/',
  _token: localStorage.getItem('token'),
  _status: localStorage.getItem('status'),
}

let theaders = new Headers();
theaders.append("Authorization", `Bearer ${cnd._token}`);
theaders.append("Cookie", "JSESSIONID=B108DD58E91AB58DB0D646212D441248");

const options = {
  method: 'GET',
  headers: theaders,
  redirect: 'follow'
}
