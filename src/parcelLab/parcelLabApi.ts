import axios from "axios";

import Tracking, { trackingToJson } from "./types/tracking";

const validateUser = (user: number) => user && !isNaN(user) && user > 0;
const validateToken = (token: string) => token && token.length > 0;
const validateEndpoint = (endpoint: string) => {
  let url: URL = null;
  try {
    url = new URL(endpoint);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

class ParcelLabApi {
  constructor(
    private endpoint: string,
    private user: number,
    private token: string
  ) {
    if (!validateUser(this.user)) {
      throw new Error("The user provided is not valid");
    }
    if (!validateToken(this.token)) {
      throw new Error("The token provided is not valid");
    }
    if (!validateEndpoint(this.endpoint)) {
      throw new Error("The endpoint provided is not valid");
    }
  }
  async createNewTracking(tracking: Tracking) {
    try {
      const resp = await axios.post(
        `${this.endpoint}/track`,
        trackingToJson(tracking),
        {
          headers: {
            "Content-Type": "application/json",
            user: this.user.toString(),
            token: this.token.toString(),
          },
        }
      );

      if (resp.status !== 200) {
        throw new Error("failed to create tracking");
      }
      return resp;
    } catch (e) {
      throw new Error(`Failed to fetch; ${e}`);
    }
  }
}

export default ParcelLabApi;
