import axios from "axios";

const BaseURL = "http://localhost:3001";

export default class TaskAPI {
  // Voucher
  static async getVouchers(service) {
    const promise = axios.get(
      `${BaseURL}/vouchers/find/?service=${service}`
    );
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  static async getVoucher(id) {
    const promise = axios.get(
      `${BaseURL}/vouchers/find/voucher?id=${id}`
    );
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  static async getVouchersId() {
    const promise = axios.get(`${BaseURL}/vouchers/all-id`);
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  static async postVoucher(voucher) {
    const partner = voucher.partner;
    delete voucher.partner;

    axios.post(
      `${BaseURL}/vouchers/create/partner?id=${partner}`,
      voucher
    );
  }

  static async putVoucherArticle(id, article) {
    axios.put(
      `http://localhost:3001/vouchers/article/voucher?id=${id}`,
      article
    );
  }

  static async deleteVoucher(id) {
    axios.delete(`${BaseURL}/vouchers/delete/voucher?id=${id}`);
  }

  // Article
  static async getArticleAll() {
    const promise = axios.get(`${BaseURL}/articles`);
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  static async getArticleVoucher(id) {
    const promise = axios.get(
      `${BaseURL}/articles/find/article-voucher?id=${id}`
    );
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  static async postArticle(article) {
    const partner = article.partner;
    delete article.partner;

    axios.post(
      `${BaseURL}/articles/create/partner?id=${partner}`,
      article
    );
  }

  static async putArticleContent(id, content) {
    axios.put(
      `${BaseURL}/articles/content/article?id=${id}`,
      content
    );
  }

  static async deleteArticle(id) {
    axios.delete(`${BaseURL}/articles/delete/article?id=${id}`);
  }

  // Giftcard
  static async getGiftcards(service) {
    const promise = axios.get(
      `${BaseURL}/giftcards/find/giftcard?service=${service}`
    );
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  static async getGiftcardsId() {
    const promise = axios.get(`${BaseURL}/giftcards/all-id`);
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  static async postGiftcard(giftcard) {
    const partner = giftcard.partner;
    delete giftcard.partner;

    axios.post(
      `${BaseURL}/giftcards/create/partner?id=${partner}`,
      giftcard
    );
  }
}
