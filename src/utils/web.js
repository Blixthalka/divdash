export const get = (url, navigate, query_params = []) => {
  return request(url, "GET", navigate, query_params)
}

const request = (url, method, navigate, query_params) => {

  const queryString = query_params.length === 0 ? '' : '?' + query_params
    .map(param => `${param.key}=${param.value}`)
    .join('&')

  return fetch(url + queryString, {
    method: method
  }).then(response => {
    if (response.status === 200 | response.status === 201) {
      return response.json()
    } else if (response.status === 401) {
      navigate("/login")
      throw new Error("unathorized");
    }
  })
}