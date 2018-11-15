
const baseurl = 'http://suadeo.serveo.net';

async function get(endpoint) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options = {
    credentials: 'include',
    headers: {},
  };

  options.headers['Authorization'] = `Bearer ${token}`;

  console.log(options);

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

async function login(username, password) {
  const body = {
    username,
    password,
  };

  const url = `${baseurl}/login`;

  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  const { status } = response;

  return {
    status,
    data,
  };
}

export default {
  get,
  login,
  post,
};
