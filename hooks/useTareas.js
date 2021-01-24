import { useUsuario } from "context/UsuarioContext";
import useAxios from "./useAxios";

const useTareas = () => {
  const { axios } = useAxios();
  const [usuario] = useUsuario();

  /**
   *
   * @param {*} queryParams
   */
  const getTareas = async (queryParams = {}) => {
    const { status, data } = await axios.post("get-tareas", {
      identificacion: usuario?.persona.identificacion,
      ...queryParams,
    });

    if (status === 200) {
      return data?.data?.map(mappTarea);
    }
  };

  const getTareaById = async (id) => {
    const { status, data } = await axios.get(`tareas/${id}`);

    if (status === 200) {
      return mappTarea(data?.data);
    }
  };

  /**
   *
   * @param {number} id
   */
  const deleteTarea = async (id) => {
    const res = await axios.delete(`delete-tarea/${id}`);
    return res?.data;
  };

  /**
   *
   * @param {number} id
   * @param {*} tarea
   * @param {string} estado
   */
  const changeEstado = async (id, tarea, estado) => {
    const { alumnos } = tarea;
    tarea.alumnos = alumnos.map((alumno) => ({
      ...alumno,
      estado: alumno.id === usuario.id ? estado : alumno.estado,
      show: alumno.id === usuario.id ? true : alumno.show,
    }));

    const res = await axios.put(`tareas/${id}`, tarea);
    return res?.data;
  };

  /**
   *
   * @param {*} tarea
   * @param {number} index
   */
  const mappTarea = (tarea, index) => {
    const alumno = tarea?.alumnos.find((alumno) => alumno.id === usuario.id);
    tarea.estado = alumno.estado;
    tarea.show = alumno.show;
    return tarea;
  };

  return { deleteTarea, changeEstado, getTareas, getTareaById };
};

export default useTareas;
