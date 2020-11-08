import { gql } from "@apollo/client";

export class Estudiante {
  static getAlumnos = gql`
    query getAlumnos {
      alumnos {
        id
        persona {
          id
          str
        }
      }
    }
  `;
}
