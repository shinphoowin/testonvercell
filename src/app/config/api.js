const apiRoot = "https://edtech.ilbc.edu.mm/api";
// const apiRoot = "https://jsonplaceholder.typicode.com/"

const get = (path, params, token) => {
  return doRequest(path, params, "GET", token);
};

const post = (path, params, token) => {
  // console.log(path, params,token)
  return doRequest(path, params, "POST", token);
};

const put = (path, params, token) => {
  return doRequest(path, params, "PUT", token);
};

const del = (path, params, token) => {
  return doRequest(path, params, "DELETE", token);
};

const objectToQueryString = (obj) => {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
};

const doRequest = async (path, params, method, activeToken) => {
  const options = { method, headers: {} };
  if (params) {
    if (method === "GET") {
      //path += "?" + objectToQueryString(params);
      path += params;
    } else {
      options.body = params;
    }
  }

  if (activeToken) {
    options.headers = new Headers({
      'Accept': 'application/json',
      'Authorization': `${activeToken}`,
      'Access-Control-Allow-Origin': "*"
    })
  }

  try {
    return await fetch(apiRoot + path, options)
    .then((response) => response.json())
    .then(result => result)
    .catch(err => err.message)
  } catch (error) {
    return error.message
  }
};
export default {
  get,
  post,
  put,
  del,
  apiRoot
};