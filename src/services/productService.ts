import axios, { CancelTokenSource } from "axios";
import DynamicQuery from "../models/dynamicQuery";

class ProductService {
  private readonly apiUrl: string;
  public cancelToken: CancelTokenSource;

  constructor() {
    this.apiUrl = process.env.API_URL + "Products/";
    this.cancelToken = axios.CancelToken.source();
  }

  public getList = () => {
    return axios.get(this.apiUrl, {
      cancelToken: this.cancelToken.token,
    });
  };

  public getListByDynamic = (dynamic?: DynamicQuery) => {
    return axios.post(this.apiUrl + "GetListByDynamic", dynamic, {
      cancelToken: this.cancelToken.token,
    });
  };
}
export default ProductService;
