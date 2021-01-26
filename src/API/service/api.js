import API from "./service";

export const baseUrl = "http://localhost:8000/api/";
export const oAuth = "http://localhost:8000/api/users/get-token/";

const Api = new API({
  baseUrl: baseUrl,
  oAuth: oAuth,
});

export default Api;
