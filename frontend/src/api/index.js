import { useContext } from "react";
import { ContextStore } from "../redux";

export const API_URL = "http://localhost:5000/";
// export const API_URL = "http://54.238.145.78:5000/";

export const labelAdd = (
  route,
  body,
  refetch,
  setRefetch,
  isLoadingDispatch
) => {
  isLoadingDispatch({ type: "SET_LOADING" });
  fetch(API_URL + "label" + "/" + route + "/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setRefetch(!refetch);
    })
    .catch((error) => console.error("Error: ", error));
};

export const labelInquiry = (route, body) => {
  return fetch(API_URL + "label" + "/" + route + "/inquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);

      return result;
    })
    .catch((error) => console.error("Error: ", error));
};

export const labelInquiryMany = (route, body) => {
  return fetch(API_URL + "label" + "/" + route + "/inquiryMany", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);

      return result;
    })
    .catch((error) => console.error("Error: ", error));
};

export const labelRename = (
  route,
  body,
  refetch,
  setRefetch,
  isLoadingDispatch
) => {
  console.log(body);
  isLoadingDispatch({ type: "SET_LOADING" });
  fetch(API_URL + "label" + "/" + route + "/rename", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setRefetch(!refetch);
    })
    .catch((error) => console.error("Error: ", error));
};

export const labelList = (route) => {
  console.log(route);
  return fetch(API_URL + "label" + "/" + route + "/labelList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);

      return result;
    })
    .catch((error) => console.error("Error: ", error));
};

export const labelDelete = (
  route,
  id,
  refetch,
  setRefetch,
  isLoadingDispatch
) => {
  console.log(route);
  isLoadingDispatch({ type: "SET_LOADING" });

  return fetch(API_URL + "label" + "/" + route + "/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setRefetch(!refetch);

      return result;
    })
    .catch((error) => console.error("Error: ", error));
};

export const topicAdd = (
  body
  // refetch,
  // setRefetch,
  // isLoadingDispatch
) => {
  // isLoadingDispatch({ type: "SET_LOADING" });
  return fetch(API_URL + "topic" + "/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.error("Error: ", error));
};

export const topicEdit = (
  body
  // refetch,
  // setRefetch,
  // isLoadingDispatch
) => {
  // isLoadingDispatch({ type: "SET_LOADING" });
  return fetch(API_URL + "topic" + "/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
      // setRefetch(!refetch);
    })
    .catch((error) => console.error("Error: ", error));
};

export const topicInquiry = (
  body
  // refetch,
  // setRefetch,
  // isLoadingDispatch
) => {
  console.log("body", body);
  // isLoadingDispatch({ type: "SET_LOADING" });
  return fetch(API_URL + "topic" + "/inquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      return result;
      // setRefetch(!refetch);
    })
    .catch((error) => console.error("Error: ", error));
};

export const topicGet = (body) => {
  console.log("body", body);
  // isLoadingDispatch({ type: "SET_LOADING" });
  return fetch(API_URL + "topic" + "/getOneTopic", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      return result;
      // setRefetch(!refetch);
    })
    .catch((error) => console.error("Error: ", error));
};

export const topicLabelInquiry = (body) => {
  console.log("body", body);
  // isLoadingDispatch({ type: "SET_LOADING" });
  return fetch(API_URL + "topic" + "/labelInquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      return result;
      // setRefetch(!refetch);
    })
    .catch((error) => console.error("Error: ", error));
};

export const topicDelete = (body) => {
  // isLoadingDispatch({ type: "SET_LOADING" });
  return fetch(API_URL + "topic" + "/deleteTopic", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      return result;
      // setRefetch(!refetch);
    })
    .catch((error) => console.error("Error: ", error));
};

export const paperAnswerAdd = (body) => {
  fetch(API_URL + "paperAnswer" + "/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.error("Error: ", error));
};

export const adminLogin = (body) => {
  return fetch(API_URL + "admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("loginResult", result);
      return result;
    })
    .catch((error) => console.error("Error: ", error));
};
