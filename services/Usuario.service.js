import { gql } from "@apollo/client";

export class Usuario {
  static STORAGE_USU_KEY = "usuarioMLN";

  static login = gql`
    mutation login($username: String!, $password: String!) {
      tokenAuth(username: $username, password: $password) {
        token
        success
        errors
        refreshToken
        user {
          id
          username
          persona {
            id
            identificacion
            tipoIdentificacion
            str
            correo
            telefono
            celular
            fechaNacimiento
            representados {
              createdAt
              observaciones
              relacionRepresentante
              persona {
                id
                str
              }
            }
          }
          grupos {
            id
            nombre
          }
        }
      }
    }
  `;

  static guardarUsuarioStorage = (usuario) => {
    try {
      console.log("usuario:", usuario);
      localStorage.setItem(this.STORAGE_USU_KEY, JSON.stringify(usuario));
    } catch (error) {
      return false;
    }
    return true;
  };

  static getUsuarioStorage = () => {
    try {
      const usuStr = localStorage.getItem(this.STORAGE_USU_KEY);
      if (usuStr) {
        return JSON.parse(usuStr);
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  static getMappedUsuario = () => {
    const usuario = this.getUsuarioStorage();
    const persona = usuario.persona;
    delete usuario.persona;
    return {
      usuario: usuario,
      persona: {
        id: persona.id,
        identificacion: persona.identificacion,
        str: persona.str,
        correo: persona.correo,
      },
    };
  };

  static logoutUsuario = () => {
    localStorage.removeItem(this.STORAGE_USU_KEY);
  };

  static isDocente = () => {
    return this.getUsuarioStorage().grupoStr === "DOCENTE";
  };
  static isRepresentante = () => {
    return this.getUsuarioStorage().grupoStr === "REPRESENTANTE";
  };
}
