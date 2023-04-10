export async function fetchJson(adress, method, data) {
  const fetchOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: window.sessionStorage.getItem("sessionToken"),
    },
  };
  if (data !== null) {
    fetchOptions.body = JSON.stringify(data);
  }
  return fetch(adress, fetchOptions);
}

export function getFormData(form) {
  const formData = new FormData(form);

  return Object.fromEntries(formData);
}
