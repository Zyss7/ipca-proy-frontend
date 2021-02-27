import Axios from './Axios';

export class Usuario {
  static STORAGE_USU_KEY = 'usuarioMLN';

  static DOCENTE = 'DOCENTE';
  static ALUMNO = 'ALUMNO';

  static guardarUsuarioStorage = (usuario) => {
    try {
      console.log('usuario:', usuario);
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
        id: persona?.id,
        identificacion: persona?.identificacion,
        str: persona?.str,
        correo: persona?.correo,
      },
    };
  };

  static logoutUsuario = () => {
    localStorage.removeItem(this.STORAGE_USU_KEY);
  };

  static isDocente = () => {
    return this.getUsuarioStorage().grupoStr === 'DOCENTE';
  };
  static isRepresentante = () => {
    return this.getUsuarioStorage().grupoStr === 'REPRESENTANTE';
  };

  static getMisAlumnos = async () => {
    const usu = this.getMappedUsuario();
    return await Axios.get(`mis-alumnos/${usu.persona.identificacion}`);
  };

  static getInfoUsuario = async () => {
    const usuario = this.getMappedUsuario();
    const body = {
      identificacion: usuario.persona.identificacion,
    };
    const { status, data } = await Axios.post('get-info-usuario', body);

    if (status === 200 && data?.transaccion) {
      return data?.data;
    }
  };
}
