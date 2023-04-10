export async function fetchJson(adress, method, data) {
  const fetchOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: window.sessionStorage.getItem("sessionToken"),
    },
  };
  console.log(fetchOptions);
  if (data !== null) {
    fetchOptions.body = JSON.stringify(data);
  }
  return fetch(adress, fetchOptions);
}

async function loginUser() {}
