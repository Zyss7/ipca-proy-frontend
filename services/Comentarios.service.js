import { Usuario } from "./Usuario.service";

export class Comentario {
  static addComentario = async (data) => {
    const usuario = Usuario.getUsuarioStorage();
    console.log(usuario);
  };
}
