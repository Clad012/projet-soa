const isLocal = false;
const AWS_ENDPOINT =
  "https://cors-anywhere.herokuapp.com/http://ec2-3-239-93-252.compute-1.amazonaws.com:8080";
const LOCAL_API = process.env.REACT_APP_API_ENDPOINT || "http://localhost:4000";
const API_ENDPOINT = isLocal ? LOCAL_API : AWS_ENDPOINT;

export async function callApi(method: string, path: string, data?: any) {
  const res = await fetch(`${API_ENDPOINT}/${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
