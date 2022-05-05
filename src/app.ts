import express from "express";

import ParcelLabApi from "./parcelLab/parcelLabApi";
import { parsePayload } from "./ownApi/tracking";

const app = express();

// TODO: could be in env vars
const port = 3000;

const parcelLabEndpoint = "https://mock-api.parcellab.com";
const user = 4;
const token = "token";

let API: ParcelLabApi = null;

app.get("/", (_, res) => {
  if (API === null) {
    res.status(500);
  } else {
    res.send("To use the tracking function, use the /track endpoint");
  }
});

app.get("/track", async (req, res) => {
  if (API === null) {
    res.status(500);
    res.send("The API is not available.\n");
    return;
  }

  const query = req.query.query as string; // in the form: dhl|tackingNumber123|3000zip|DE
  if (!query) {
    res.status(400);
    res.send(`A query parameter is required`);
    return;
  }

  let payload = null;
  try {
    payload = parsePayload(query);
  } catch (err) {
    res.status(400);
    res.send(`There has been an error with this request: ${err}`);
    return;
  }

  try {
    const track = await API.createNewTracking(payload);
    res.send(track);
  } catch (e) {
    res.status(400);
    res.send(`There has been an error with this request: ${e}`);
  }
});

app.listen(port, () => {
  try {
    API = new ParcelLabApi(parcelLabEndpoint, user, token);
  } catch (e) {
    console.error("ParcelLab API could not be created", e);
  }
  return console.log(`Express is listening at http://localhost:${port}`);
});
