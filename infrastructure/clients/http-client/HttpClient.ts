import { ClientError } from '../../../domain/errors/client/ClientError';
import { NetworkError } from '../../../domain/errors/client/NetworkError';
import { HttpError } from '../../../domain/errors/client/HttpError';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";

let baseUrl = process.env.NEXT_PUBLIC_API_URL;

class HttpClient {
  private _apiConfig: AxiosRequestConfig;
  private _AXIOS: AxiosInstance;
  private _AXIOS_FORM: AxiosInstance;

  constructor() {
    const apiConfig: AxiosRequestConfig = {
      baseURL: baseUrl,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000,
    };
    this._apiConfig = apiConfig;
    this._AXIOS = generateAxiosInstance(this._apiConfig);
    this._AXIOS_FORM = generateFormDataAxiosInstance(this._apiConfig);
  }

  public async get(
    urlPath: string,
    token: string
  ): Promise<AxiosResponse["data"]> {
    try {
      if (token) {
        const res = await this._AXIOS.get(urlPath, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        return res.data;
      } else {
        const res = await this._AXIOS.get(urlPath);
        return res.data;
      }
    } catch (error) {
      let resolvedError: ClientError = resolveError(error)
      throw resolvedError
    }
  }

  public async post(
    urlPath: string,
    data: any,
    token: string = null
  ): Promise<AxiosResponse["data"]> {
    try {
      if (token) {
        const res = await this._AXIOS.post(urlPath, data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        return res.data;
      } else {
        const res = await this._AXIOS.post(urlPath, data);
        return res.data;
      }
    } catch (error) {
      let resolvedError: ClientError = resolveError(error)
      throw resolvedError
    }
  }

  public async put(urlPath: string, data: any, token: string = null): Promise<AxiosResponse["data"]> {
    try {
      if (token) {
        const res = await this._AXIOS.put(urlPath, data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        return res.data;
      } else {
        const res = await this._AXIOS.put(urlPath, data);
        return res.data;
      }
    } catch (error) {
      let resolvedError: ClientError = resolveError(error)
      throw resolvedError
    }
  }

  public async delete(urlPath: string, data: any, token: string): Promise<AxiosResponse["data"]> {
    try {
      if (token) {
        const res = await this._AXIOS.delete(urlPath, {
          headers: {
            Authorization: "Bearer " + token,
          },
          data: data
        });
        return res.data;
      } else {
        const res = await this._AXIOS.delete(urlPath);
        return res.data;
      }
    } catch (error) {
      let resolvedError: ClientError = resolveError(error)
      throw resolvedError
    }
  }
}

function generateAxiosInstance(apiConfig: AxiosRequestConfig): AxiosInstance {
  return axios.create(apiConfig);
}

function generateFormDataAxiosInstance(
  apiConfig: AxiosRequestConfig
): AxiosInstance {
  const formDataConfig = apiConfig;
  formDataConfig.headers["Content-Type"] = "application/x-www-form-urlencoded";

  return generateAxiosInstance(formDataConfig);
}

function resolveError(error: AxiosError): ClientError {
  if (error.response) {
    let httpError: HttpError = new HttpError(error.response.status, error.message, error.response.data.response)
    return httpError
  } else {
    let networkError: NetworkError = new NetworkError(error.message)
    return networkError
  }
}

export default HttpClient;
