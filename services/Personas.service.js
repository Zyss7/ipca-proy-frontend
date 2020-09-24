import { gql } from "@apollo/client";

export class Estudiante {
  static getEstudiantes = gql`
    query getEstudiantes {
      estudiantes {
        id
        persona {
          id
          str
        }
      }
    }
  `;
}
