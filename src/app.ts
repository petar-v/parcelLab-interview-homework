import express from "express";

import ParcelLabApi from "./parcelLab/parcelLabApi";

const app = express();
const port = 3000;

const parcelLabEndpoint = "https://mock-api.parcellab.com";
const user = 4;
const token = "token";

let API: ParcelLabApi = null;

app.get("/", (_, res) => {
  if (API === null) {
    res.send("The API is not available.\n");
  }
  res.send("To use the tracking function, use the /track endpoint");
});

app.listen(port, () => {
  try {
    API = new ParcelLabApi(parcelLabEndpoint, user, token);
  } catch (e) {
    console.error("ParcelLab API could not be created", e);
  }
  return console.log(`Express is listening at http://localhost:${port}`);
});
