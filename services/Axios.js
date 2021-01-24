import Axios from "axios";
import { URL_API_MN } from "./urls";

const instance = Axios.create({
  baseURL: URL_API_MN,
});

export default instance;
