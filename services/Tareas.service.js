import appFirebase from "fire-base";
import moment from "moment";
import * as uuid from "uuid";
import Axios from "./Axios";
import { Usuario } from "./Usuario.service";

export class Tarea {
  static tareas = appFirebase.db.collection("tareas");

  static getAll = async () => {
    /*
    const querySnapshot = await this.tareas.get();
    const data = querySnapshot.docs.map(Firebase.defaultMapper);
    return data.map((obj) => {
      return {
        ...obj,
        fechaEntrega: dateToFormatDate(obj.fechaEntrega.toDate()),
      };
    });
    */

    const { status, data } = await Axios.get("tareas");

    if (status === 200) {
      return data;
    }
  };

  static getById = async (id) => {
    /*
    const querySnapShot = await this.tareas.doc(id).get();

    const data = querySnapShot.data();
    data.id = querySnapShot.id;
    data.fechaEntrega = data.fechaEntrega.toDate();
    return data;
    */

    const { status, data } = await Axios.get(`tareas/${id}`);

    if (status === 200) {
      return data;
    }
  };

  static logicDelete = async (id) => {
    try {
      //cambia a estado E de eliminado
      await this.tareas.doc(id).update({ estadoLogico: "D" });
    } catch (error) {
      return error;
    }
  };

  static mappDocente = () => {
    return Usuario.getMappedUsuario().persona;
  };

  static save = async (tarea) => {
    tarea.createdAt = moment().toISOString();
    tarea.docente = this.mappDocente();

    const { data } = await Axios.post("tareas", tarea);

    return data;
  };

  static update = async (id, tarea) => {
    tarea.docente = this.mappDocente();
    console.log(tarea.docente);
    return await Axios.put(`tareas/${id}`, tarea);
  };

  static addComentario = async (id, payload) => {
    try {
      const usuario = Usuario.getUsuarioStorage();
      payload.id = `${uuid.v4()}${uuid.v4()}`;
      payload.fechaEnvio = moment().toISOString();
      payload.usuario = {
        username: usuario.username,
        persona: usuario.persona.str,
      };

      const querySnapshot = await this.tareas.doc(id).get();

      const data = querySnapshot.data();
      let comentarios = data.comentarios || [];

      comentarios.push(payload);

      await this.tareas
        .doc(id)
        .update({ comentarios, nuevosComentarios: true });
    } catch (error) {
      console.error(error);
    }
  };

  static deleteComentario = async (idDoc, idComent) => {
    try {
      const querySnapshot = await this.tareas.doc(idDoc).get();

      const data = querySnapshot.data();
      let comentarios = data.comentarios || [];
      const comentario = comentarios.find((e) => e.id === idComent);

      const index = comentarios.indexOf(comentario);
      comentarios.splice(index, 1);

      await this.tareas.doc(idDoc).update({ comentarios });
    } catch (error) {
      console.error(error);
    }
  };

  static deleteTarea = async (idDoc) => {
    try {
      await this.tareas.doc(idDoc).delete();
      return true;
    } catch (error) {}
    return false;
  };

  static getTareasAlumno = async () => {
    const { persona } = Usuario.getMappedUsuario();
    const { data } = await Axios.get(`tareas/alumno/${persona.id}`);
    return data;
  };
}
