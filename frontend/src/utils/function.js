import { API_URL } from "../api/index";

export const calculateScore = async (number) => {
  console.log("number", number);
  const body = {
    number: number,
  };
  const response = await fetch(API_URL + "paperAnswer/inquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const fetchData = await response.json();
  return fetchData;
  console.log("fetchData", fetchData);
};
