export const URL_BASE = 'http://localhost:8000/';
// export const URL_BASE = 'https://ipca-backend.herokuapp.com/';
export const URL_API_MN = `${URL_BASE}api/v1/`;

export const urlGetListasReproduccion = 'get-listas-reproduccion';
export const urlCrearLista = 'crear-lista-reproduccion';
export const urlGetListaById = (id) => `get-lista-reproduccion-by-id/${id}`;
export const urlEditarListaById = (id) => `editar-lista-reproduccion-by-id/${id}`;
