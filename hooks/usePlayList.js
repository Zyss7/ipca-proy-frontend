import {
  urlCrearLista,
  urlEditarListaById,
  urlGetListaById,
  urlGetListasReproduccion,
} from "@services/urls";
import useAxios from "./useAxios";
const usePlayList = () => {
  const { axios } = useAxios();

  const getListasTable = async () => {
    const res = await axios.post(urlGetListasReproduccion);
    return res?.data;
  };

  /**
   *
   * @param {*} body
   */
  const crear = async (body) => {
    const res = await axios.post(urlCrearLista, body);

    return res?.data;
  };

  const getById = async (id) => {
    const res = await axios.post(urlGetListaById(id));

    return res?.data;
  };

  const editarById = async (id, body) => {
    const res = await axios.post(urlEditarListaById(id), body);
    return res?.data;
  };
  return { getListasTable, crear, getById, editarById };
};

export default usePlayList;
