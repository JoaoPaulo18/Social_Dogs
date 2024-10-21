import { json } from "react-router-dom";

export const API_URL = "https://dogsapi.origamid.dev/json";

export function TOKEN_POST(Infos) {
  return {
    url: API_URL + "/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Infos),
    },
  };
}

export function TOKEN_VALIDATE(token) {
  return {
    url: API_URL + "/jwt-auth/v1/token/validate",
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function GET_USER(token) {
  return {
    url: API_URL + "/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function PHOTOS_GET(total, page, user) {
  return {
    url:
      API_URL +
      `/api/photo/?_total=${total}&_page=${page}&_user=${
        user != undefined ? user : ""
      }`,
    options: {
      method: "GET",
    },
  };
}

export function PHOTO_GET(id) {
  return {
    url: API_URL + `/api/photo/${id}`,
    options: {
      method: "GET",
    },
  };
}

export function COMMENT_GET(id) {
  return {
    url: API_URL + `/api/comment/${id}`,
    options: {
      method: "GET",
    },
  };
}

export function COMMENT_POST(id, comment) {
  return {
    url: API_URL + `/api/comment/${id}`,
    options: {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify(comment),
    },
  };
}

export function PHOTO_POST(Form) {
  return {
    url: API_URL + `/api/photo`,
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: Form,
    },
  };
}

export function USER_POST(body) {
  return {
    url: API_URL + `/api/user`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function STATS_GET() {
  return {
    url: API_URL + `/api/stats`,
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    },
  };
}
