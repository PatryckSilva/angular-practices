import axios, { AxiosError, AxiosResponse } from 'axios';
import { HttpClient, HttpRequest } from '../../@types/httpTypes';

export class HttpClientAdapter implements HttpClient {
  async request(data: HttpRequest) {
    if (data.paginated) {
      return this.paginatedRequest(data);
    }

    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      });
      return {
        statusCode: axiosResponse.status,
        body: axiosResponse?.data,
      };
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>;
      throw new Error(_error.response?.data.message);
    }
  }

  private async paginatedRequest(data: HttpRequest) {
    let nonce = Date.now();
    let pageNumber = 1;
    let allData: any[] = [];

    while (true) {
      try {
        const axiosResponse = await axios.request({
          url: `${data.url}&limit=1000&page=${pageNumber}&nonce=${nonce}`,
          method: data.method,
          headers: data.headers,
          data: data.body,
        });

        allData = [...allData, ...axiosResponse.data.data];
        pageNumber++;
        nonce = Date.now() + 1;

        if (axiosResponse.data.data.length < 1000) {
          break;
        }
      } catch (error) {
        const _error = error as AxiosError<{ message: string }>;
        throw new Error(_error.response?.data.message);
      }
    }

    return {
      statusCode: 200,
      body: allData,
    };
  }
}
