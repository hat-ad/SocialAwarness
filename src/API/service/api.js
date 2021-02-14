import API from "./service";

// export const baseUrl = "https://social-awarness-backend.herokuapp.com/api/";
export const baseUrl = "http://localhost:8000/api/";

export const oAuth =
  "https://social-awarness-backend.herokuapp.com/api/users/get-token/";

const Api = new API({
  baseUrl: baseUrl,
  oAuth: oAuth,
});

export default Api;
