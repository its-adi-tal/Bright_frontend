//the api Client - gate for http request to the backend
const BASE_URL = (import.meta?.env?.VITE_API_BASE_URL ?? "http://localhost:8000/api").replace(/\/$/,"");

let tokenProvider = null;

export function setAuthTokenProvider(fn) {tokenProvider= fn;}

async function request(path, {method= "GET", headers={}, body} = {}){
    const token = tokenProvider ? await tokenProvider() : null;

    const res = await fetch(`${BASE_URL}${path}`,{
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? {Authorization: `Bearer ${token}`}: {}),
            ...headers,
        },
        body: body ? JSON.stringify(body): undefined,
    });


let data = null; //keep the reason the req failed
const text = await res.text();
if (text){
    try {
        data = JSON.parse(text); 
    } catch {
        data = text;
    }
}

if (!res.ok) {
    const err = new Error((data && data.message) || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err; 
}

return {data, status: res.status};
}

export const apiClient = {
  get:  (p)            => request(p, { method: "GET" }),
  post: (p, body)      => request(p, { method: "POST", body }),
  put:  (p, body)      => request(p, { method: "PUT",  body }),
  delete: (p)          => request(p, { method: "DELETE" }),
};