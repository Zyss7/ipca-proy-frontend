import Axios from "./Axios";

export class PlayList {
  INSTANCE = null;

  static single() {
    if (this.INSTANCE) this.INSTANCE = new PlayList();
    return this.INSTANCE;
  }

  static getListasTable = async () => {
    const res = await Axios.post("get-listas-reproduccion");
    return res?.data;
  };

  static saveLista = async (body) => {
    const res = await Axios.post("crear-lista-reproduccion", { body });
  };
}
