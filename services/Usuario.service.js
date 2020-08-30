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
        }
      }
    }
  `;

  static guardarUsuarioStorage = (usuario) => {
    try {
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

  static logoutUsuario = () => {
    localStorage.removeItem(this.STORAGE_USU_KEY);
  };
}
