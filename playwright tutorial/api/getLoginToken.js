// import * as nodeFetch from "node-fetch";

export const getLoginToken = async (username, password) => {
  try {
    console.log("user", username);
    const response = await fetch("http://localhost:2221/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
