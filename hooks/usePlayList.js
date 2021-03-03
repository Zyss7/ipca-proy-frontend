import {
  urlCrearLista,
  urlEditarListaById,
  urlGetListaById,
  urlGetListasReproduccion,
} from '@services/urls';
import useAxios from './useAxios';
const usePlayList = () => {
  const { privateAxios } = useAxios();

  const getListasTable = async () => {
    const res = await privateAxios.post(urlGetListasReproduccion);
    return res?.data;
  };

  /**
   *
   * @param {*} body
   */
  const crear = async (body) => {
    const res = await privateAxios.post(urlCrearLista, body);

    return res?.data;
  };

  const getById = async (id) => {
    const res = await privateAxios.post(urlGetListaById(id));
    return res?.data;
  };

  const editarById = async (id, body) => {
    const res = await privateAxios.post(urlEditarListaById(id), body);
    return res?.data;
  };

  const eliminarPlayList = async (id) => {
    const res = await privateAxios.post(`eliminar-lista-reproduccion-by-id/${id}`);
    return res?.data;
  };

  return { getListasTable, crear, getById, editarById, eliminarPlayList };
};

export default usePlayList;
