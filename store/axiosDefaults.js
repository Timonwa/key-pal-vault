export const baseURL = "https://keypalvault-production.up.railway.app/api/v1";

export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// get psg_auth_token from local storage and kpv_auth_token from local storage
// if psg_auth_token is present, add it to the headers
// else, if kpv_auth_token is present, add it to the headers
// else, do nothing
export const getHeaders = () => {
  const psg_auth_token = localStorage.getItem("psg_auth_token");
  const kpv_auth_token = localStorage.getItem("kpv_auth_token");
  const headers = { ...defaultHeaders };
  if (psg_auth_token) {
    headers[Authorization] = `Bearer ${psg_auth_token}`;
  } else if (kpv_auth_token) {
    headers[Authorization] = `Bearer ${kpv_auth_token}`;
  }
  return headers;
};

export const axiosDefaults = {
  baseURL,
  headers: getHeaders(),
};
