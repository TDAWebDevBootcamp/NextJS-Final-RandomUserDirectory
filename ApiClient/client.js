import axios from "axios";

export class ApiClient {
  responseStatusCheck(responseObject) {
    if (responseObject.status >= 200 && responseObject.status < 300) {
      return Promise.resolve(responseObject);
    } else {
      return Promise.reject(new Error(responseObject.statusText));
    }
  }

  getRequest(url) {
    return axios
      .get(url)
      .then(this.responseStatusCheck)
      .catch((error) => {
        console.log(error);
      });
  }

  getQuote() {
    return this.getRequest("https://quotable.io/random");
  }

  getAuthors(skip = 0, limit) {
    return this.getRequest(
      `https://quotable.io/authors?skip=${skip}&limit=${limit}`
    );
  }

  getQuoteByAuthor(authorId) {
    return this.getRequest(`https://quotable.io/quotes?authorId=${authorId}`);
  }
}

export default ApiClient;