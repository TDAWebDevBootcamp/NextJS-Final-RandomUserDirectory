import axios from "axios";

const BASE_URL = "https://randomuser.me/api";

export class ApiClient {
  async responseStatusCheck(responseObject) {
    if (responseObject.status >= 200 && responseObject.status < 300) {
      return responseObject;
    }
    throw new Error(responseObject.statusText);
  }

  async getRequest(endpoint, params = {}) {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
      return this.responseStatusCheck(response);
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Get multiple users (default 5)
  async getUsers() {
    return this.getRequest("", { results: 5 });
  }
}

export default ApiClient;