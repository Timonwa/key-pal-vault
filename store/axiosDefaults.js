export const baseURL = "https://keypalvault-production.up.railway.app/api/v1";

export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// fetch token from local storage
const kpv_auth_token =
  typeof localStorage !== "undefined"
    ? localStorage.getItem("kpv_auth_token")
    : null;
const token = kpv_auth_token;

export const authHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};

export const axiosDefaults = {
  baseURL,
  defaultHeaders,
  authHeaders,
};
