import moment from "moment";
import Axios from "./Axios";
import { Usuario } from "./Usuario.service";

export class Tarea {
  static PENDIENTE = "PENDIENTE";
  static ENVIADO = "ENVIADO";

  static getAll = async (queryParams = {}) => {
    const usuario = Usuario.getMappedUsuario();
    const { status, data } = await Axios.post("get-tareas", {
      identificacion: usuario?.persona.identificacion,
      ...queryParams,
    });

    if (status === 200) {
      return data?.data;
    }
  };

  static getById = async (id) => {
    const { status, data } = await Axios.get(`tareas/${id}`);

    if (status === 200) {
      return data?.data;
    }
  };

  static mappDocente = () => {
    return Usuario.getMappedUsuario().persona;
  };

  static save = async (tarea) => {
    tarea.createdAt = moment().toISOString();
    tarea.docente = this.mappDocente();

    const { data } = await Axios.post("create-tarea", tarea);

    return data.data;
  };

  static update = async (id, tarea) => {
    tarea.docente = this.mappDocente();
    return await Axios.put(`tareas/${id}`, tarea);
  };

  static getTareasAlumno = async () => {
    const { persona } = Usuario.getMappedUsuario();
    const { data } = await Axios.get(`tareas/alumno/${persona.id}`);
    return data;
  };
}
