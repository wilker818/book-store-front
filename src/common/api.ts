import axios, { type AxiosInstance } from "axios";

import { environment } from "../config/environment";

abstract class Api {
  protected axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: environment.api.url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}

export default Api;
