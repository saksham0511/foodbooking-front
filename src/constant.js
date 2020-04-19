export const IP = "http://localhost:8080"; //43.163
export const httpRequest = (action, requestBody) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };
  const url = IP + action;
  return fetch(`${url}`, requestOptions);
};
