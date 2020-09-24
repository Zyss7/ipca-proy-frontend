import appFirebase, { Firebase } from "fire-base";
import moment from "moment";
import { Usuario } from "./Usuario.service";
import * as uuid from "uuid";
import { dateToFormatDate } from "@utils/utils";

export class Tarea {
  static tareas = appFirebase.db.collection("tareas");

  static getAll = async () => {
    const querySnapshot = await this.tareas.get();
    const data = querySnapshot.docs.map(Firebase.defaultMapper);
    return data.map((obj) => {
      return {
        ...obj,
        fechaEntrega: dateToFormatDate(obj.fechaEntrega.toDate()),
      };
    });
  };

  static getById = async (id) => {
    const querySnapShot = await this.tareas.doc(id).get();

    const data = querySnapShot.data();
    data.id = querySnapShot.id;
    data.fechaEntrega = data.fechaEntrega.toDate();
    return data;
  };

  static logicDelete = async (id) => {
    try {
      //cambia a estado E de eliminado
      await this.tareas.doc(id).update({ estadoLogico: "D" });
    } catch (error) {
      return error;
    }
  };

  static save = async (data) => {
    try {
      data.createdAt = moment().toISOString();
      data.docente = Usuario.getMappedUsuario();
      const tarea = await this.tareas.add(data);

      const querySnapShot = await tarea.get();
      const response = { id: querySnapShot.id };
      return response;
    } catch (error) {
      console.log("ERROR: ", error);
      return error;
    }
  };

  static update = async (id, data) => {
    try {
      await this.tareas.doc(id).update(data);
    } catch (error) {}
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
}
