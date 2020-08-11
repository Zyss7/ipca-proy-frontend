import Axios from "axios";
import { URL_API_MN } from "./urls";

export class Tarea {
  static getAll = async () => {
    const { data, status } = await Axios.get(`${URL_API_MN}tareas`);
    console.log(data);
    return data;
  };

  static create = async () => {
    const { data } = await Axios.post(`${URL_API_MN}tareas`);
    console.log(data);
    return data;
  };
}
