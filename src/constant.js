export const IP = "https://foodbooking.herokuapp.com/"; //43.163
export const httpRequest = (action, requestBody) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };
  const url = IP + action;
  return fetch(`${url}`, requestOptions);
};
