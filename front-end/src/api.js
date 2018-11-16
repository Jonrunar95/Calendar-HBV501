
const baseurl = 'http://localhost:8080'; //'http://suadeo.serveo.net';

async function get(endpoint) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options = {
    method: 'GET',
    headers: {},
  };

  options.headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(url, options);

  const data = await response.json();
  const { status } = response;

  return {
    status,
    data,
  };
}

async function post(endpoint, body) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);
  const data = await response.json();
  const { status } = response;

  return {
    status,
    data,
  };
}

async function deleteMethod(endpoint) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options = {
    method: 'DELETE',
    headers: {
    },
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  let data;

  const response = await fetch(url, options);
  const { status } = response;
  if (status !== 200) data = await response.json();


  return {
    status,
    data,
  };
}


export default {
  get,
  post,
  deleteMethod,
};
