import Axios from 'axios';
import { URL_API_MN } from './urls';

const axios = Axios.create({
  baseURL: URL_API_MN,
  headers: { authorization: '123' },
});

export default axios;
