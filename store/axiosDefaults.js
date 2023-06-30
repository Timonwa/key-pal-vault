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
  const psg_auth_token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("psg_auth_token")
      : null;
  const kpv_auth_token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("kpv_auth_token")
      : null;
  const headers = { ...defaultHeaders };
  if (psg_auth_token) {
    headers["Authorization"] = `Bearer ${psg_auth_token}`;
  } else if (kpv_auth_token) {
    headers["Authorization"] = `Bearer ${kpv_auth_token}`;
  }
  return headers;
};

export const axiosDefaults = {
  baseURL,
  defaultHeaders,
  headers: getHeaders(),
};
