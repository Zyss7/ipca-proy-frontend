import appFirebase, { Firebase } from "fire-base";

export class Comentario {
  static db = appFirebase.db.collection("mensajes");

  static addComentario = async (data) => {
    await this.db.add(data);
  };

  static getAll = (id, callback) => {
    this.db
      .where("room", "==", "comentariosTareas")
      .where("uuid", "==", id)
      .onSnapshot((snap) => {
        callback(snap.docs.map(Firebase.defaultMapper));
      });
  };

  static delete = async (id) => {
    await this.db.doc(id).delete();
  };
}
